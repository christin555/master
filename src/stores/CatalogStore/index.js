import {observable, get, action, autorun, computed, makeObservable} from 'mobx';
import {status as statusEnum} from '../../enums';
import api from 'api';
import {alert} from '../Notifications';

class CatalogStore {
  @observable status = statusEnum.LOADING;
  @observable categories;
  @observable products;
  @observable hierarchy;
  @observable isLastLevel;
  @observable count = 0;

  /**
   * @param {RouterStore} RouterStore
   * @param {PageStore} PageStore
   */
  constructor(RouterStore, PageStore) {
    this.RouterStore = RouterStore;
    this.PageStore = PageStore;

    makeObservable(this);

    this.getHierarchyDisposer = autorun(this.getHierarchy);
    this.getCatalogDisposer = autorun(this.getCatalog);
    this.getCountProductsDisposer = autorun(this.getCountProducts);
  }

  @computed get category() {
    return get(get(this.RouterStore.match, 'params'), 'category') || null;
  }

  @computed get fastfilter() {
    const urlAddress = new URLSearchParams(this.RouterStore.params || '');

    return urlAddress.get('search');
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

  getHierarchy = async() => {
    try {
      const body = {category: this.category};
      const {hierarchy, isLastLevel} = await api.post('catalog/getHierarchy', body);

      this.setHierarchy(hierarchy);
      this.setIsLastLevel(isLastLevel);
    } catch(_) {
      // do nothing
    }
  };

  getCountProducts = async() => {
    const {category} = this;
    const {filter} = this.PageStore;

    try {
      const body = {searchParams: {category, filter}};
      const count = await api.post('catalog/countProducts ', body);

      this.setCount(count);
    } catch(_) {
      // do nothing
    }
  };

  getCatalog = async() => {
    const {category} = this;
    const {offset, limit, filter} = this.PageStore;

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
  };

  closeStore() {
    this.getHierarchyDisposer();
    this.getCatalogDisposer();
    this.getCountProductsDisposer();
  }
}

export {CatalogStore};
