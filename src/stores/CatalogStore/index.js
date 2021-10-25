import {observable, get, reaction, action, autorun, computed, makeObservable} from 'mobx';
import {status as statusEnum} from '../../enums';
import api from 'api';
import {alert} from '../Notifications';
import FilterStore from './FilterStore';

class CatalogStore {
    RouterStore
    FilterStore

    @observable status = statusEnum.LOADING;
    @observable categories;
    @observable products;
    @observable hierarchy;
    @observable isLastLevel;
    @observable count = 0;

    constructor({RouterStore}) {
      this.RouterStore = RouterStore;
      autorun(this.getHierarchy);
      makeObservable(this);

      reaction(
        () => [this.offset, this.category, this.limit, this.RouterStore.params, this.filter],
        this.getCatalog,
        {fireImmediately: true}
      );

      reaction(
        () => [this.category, this.RouterStore.params, this.filter],
        this.getCountProducts,
        {fireImmediately: true}
      );

      this.FilterStore = new FilterStore({RouterStore, CatalogStore: this});
    }

    @computed get limit() {
      const urlAddress = new URLSearchParams(this.RouterStore.params || '');

      return Number(urlAddress.get('limit')) || 12;
    }

    @computed get page() {
      const urlAddress = new URLSearchParams(this.RouterStore.params || '');

      return Number(urlAddress.get('page')) || 1;
    }

    @computed get fastfilter() {
      const urlAddress = new URLSearchParams(this.RouterStore.params || '');

      return urlAddress.get('search');
    }

    @computed get filter() {
      const searchParams = new URLSearchParams(this.RouterStore.params || {});
      const filter = {};

      for (const pair of searchParams.entries()) {
        const key = pair[0];
        const val = pair[1];

        if (key === 'search') {
          filter[key] = val;
        } else {
          filter[key] = pair[1]
            .split(',')
            .map((item) => Number(item.trim()))
            .filter(Boolean);
        }

      }

      return filter;
    }

    @computed get offset() {
      return (this.page - 1) * this.limit;
    }

    @computed get category() {
      return get(get(this.RouterStore.match, 'params'), 'category') || null;
    }

    @computed get productsAvailable() {
      return !!this.products?.length;
    }

    @action setCategories = (categories) => {
      this.categories = categories;
    }

    @action setProducts = (products) => {
      this.products = products;
    }

    @action setHierarchy = (hierarchy) => {
      this.hierarchy = hierarchy;
    }

    @action setIsLastLevel = (isLastLevel) => {
      this.isLastLevel = isLastLevel;
    }

    @action setCount = (count) => {
      this.count = count;
    }

    @action setStatus = (status) => {
      this.status = status;
    }

    setPage = (page) => this.setURLSearchParams(this.limit, page, this.filter);
    setLimit = (limit) => this.setURLSearchParams(limit, 1, this.filter);
    setFilter = (filter) => this.setURLSearchParams(this.limit, this.offset, filter);

    setURLSearchParams = (limit, offset, filter) => {
      const urlParams = new URLSearchParams();

      for (const [key, value] of Object.entries(filter)) {
        if (!(!value || Array.isArray(value) && !value.length)) {
          urlParams.set(key, value);
        }
      }

      urlParams.set('limit', limit);
      urlParams.set('page', offset);

      this.RouterStore.history.push({
        search: urlParams.toString()
      });
    }

    getHierarchy = async() => {
      try {
        const body = {category: this.category};
        const {hierarchy, isLastLevel} = await api.post('catalog/getHierarchy', body);

        this.setHierarchy(hierarchy);
        this.setIsLastLevel(isLastLevel);
      } catch(_) {
      }
    }

    getCountProducts = async() => {
      const {category, filter} = this;

      try {
        const body = {searchParams: {category, filter}};

        const count = await api.post('catalog/countProducts ', body);

        this.setCount(count);
      } catch(_) {
      }
    }

    getCatalog = async() => {
      const {category, limit, offset, filter} = this;

      this.setStatus(statusEnum.LOADING);

      try {
        const body = {searchParams: {category, filter}, limit, offset};
        const {categories, products} = await api.post('catalog/getCatalog', body);

        this.setCategories(categories);
        this.setProducts(products);
        this.setStatus(statusEnum.SUCCESS);
      } catch(_) {
        this.setStatus(statusEnum.ERROR);
        alert({type: 'error', title: 'Ошибка при получении товаров'});
      }
    }
}

export default CatalogStore;
