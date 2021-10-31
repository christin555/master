import {observable, get, reaction, action, autorun, computed, makeObservable} from 'mobx';
import {status as statusEnum} from '../../enums';
import api from 'api';
import {alert} from '../Notifications';

class CatalogStore {
    RouterStore
    FilterStore

    @observable status = statusEnum.LOADING;
    @observable categories;
    @observable products;
    @observable hierarchy;
    @observable isLastLevel;
    @observable count = 0;

    constructor({RouterStore, UrlStore}) {
      this.RouterStore = RouterStore;
      this.UrlStore = UrlStore;
      autorun(this.getHierarchy);
      makeObservable(this);

      this.getCatalog();
      this.getCountProducts();

      this.getCatalogDisposer = reaction(
        () => [this.offset, this.category, this.limit, this.RouterStore.params, this.filter],
        this.getCatalog
      );

      this.getCountProductsDisposer = reaction(
        () => [this.category, this.RouterStore.params, this.filter],
        this.getCountProducts
      );
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
      return this.UrlStore.toJSON();

      // const searchParams = new URLSearchParams(this.RouterStore.params || {});
      // const filter = {};
      //
      // for (const pair of searchParams.entries()) {
      //   const key = pair[0];
      //   const val = pair[1];
      //
      //   if (key === 'search') {
      //     filter[key] = val;
      //   } else {
      //     filter[key] = pair[1]
      //       .split(',')
      //       .map((item) => Number(item.trim()))
      //       .filter(Boolean);
      //   }
      //
      // }
      //
      // return filter;
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
  };

  @action setProducts = (products) => {
    this.products = products;
  };

  @action setHierarchy = (hierarchy) => {
    this.hierarchy = hierarchy;
  };

  @action setIsLastLevel = (isLastLevel) => {
    this.isLastLevel = isLastLevel;
  };

  @action setCount = (count) => {
    this.count = count;
  };

  @action setStatus = (status) => {
    this.status = status;
  };

  setPage = (page) => this.UrlStore.toPATH(this.limit, page);
  setLimit = (limit) => this.UrlStore.toPATH(limit, 1);

  setURLSearchParams = (limit, offset, filter) => {
    const urlParams = new URLSearchParams();

    // for (const [key, value] of Object.entries(filter)) {
    //   if (!(!value || Array.isArray(value) && !value.length)) {
    //     urlParams.set(key, value);
    //   }
    // }

    // urlParams.set('limit', limit);
    // urlParams.set('page', offset);

    // this.RouterStore.history.push({
    //   search: urlParams.toString()
    // });
  };

  getHierarchy = async() => {
    try {
      const body = {category: this.category};
      const {hierarchy, isLastLevel} = await api.post('catalog/getHierarchy', body);

      this.setHierarchy(hierarchy);
      this.setIsLastLevel(isLastLevel);
    } catch(_) {
    }
  };

  getCountProducts = async() => {
    const {category, filter} = this;

    try {
      const body = {searchParams: {category, filter}};

      const count = await api.post('catalog/countProducts ', body);

      this.setCount(count);
    } catch(_) {
    }
  };

    getCatalog = async() => {
      const {category, limit, offset, filter} = this;

      console.log(filter);

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

export {CatalogStore};
