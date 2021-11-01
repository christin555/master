import {action, computed, makeObservable} from 'mobx';

export class PageStore {
  constructor(RouterStore, UrlStore) {
    makeObservable(this, {
      filter: computed.struct,
      page: computed,
      limit: computed,
      setPage: action,
      setLimit: action,
      setFilter: action
    });

    this.RouterStore = RouterStore;
    this.UrlStore = UrlStore;
  }

  get params() {
    return new URLSearchParams(this.RouterStore.params || '');
  }

  get limit() {
    return Number(this.params.get('limit')) || 12;
  }

  get page() {
    return Number(this.params.get('page')) || 1;
  }

  get filter() {
    const {params} = this;

    params.delete('limit');
    params.delete('page');

    const filter = {};

    params.forEach((filterValue, key) => {
      if (key === 'search') {
        filter[key] = filterValue;
      } else {
        // filter[key] = filterValue.split(',');
      }
    });

    return filter;
  }

  get offset() {
    return (this.page - 1) * this.limit;
  }

  setPage = (page) => {
    const {params} = this;

    params.set('page', page);

    this.RouterStore.history.push({
      search: params.toString()
    });
  };

  setLimit = (limit) => {
    const {params} = this;

    params.set('limit', limit);

    this.RouterStore.history.push({
      search: params.toString()
    });
  };

  setFilter = () => {
    const {params} = this;

    params.delete('limit');
    params.delete('page');

    // this.RouterStore.history.push({
    //   search: urlParams.toString()
    // });
  };
}
