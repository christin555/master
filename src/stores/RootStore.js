import {makeObservable, observable, action} from 'mobx';
import {DoorsStore} from './Filter/DoorsStore';
import {LaminateStore} from './Filter/LaminateStore';

export class RootStore {
  @observable stores = {};

  constructor() {
    makeObservable(this);
  }

  get ActiveFilterStore() {
    switch (this.CatalogStore.category) {
      case DoorsStore.category:
        return this.DoorsStore;
      case LaminateStore.category:
        return this.LaminateStore;
      default:
        return {};
    }
  }

  get DoorsStore() {
    return this.stores.DoorsStore || {};
  }

  get LaminateStore() {
    return this.stores.LaminateStore || {};
  }

  get PageStore() {
    return this.stores.PageStore || {};
  }

  get CatalogStore() {
    return this.stores.CatalogStore || {};
  }

  get RouterStore() {
    return this.stores.RouterStore || {};
  }

  @action register = (name, store) => {
    this.stores[name] = store;

    return this;
  };
}