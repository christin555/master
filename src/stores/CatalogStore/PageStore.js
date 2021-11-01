import {action, computed, makeObservable} from 'mobx';

export class PageStore {
  constructor(RouterStore) {
    makeObservable(this, {
      _params: computed,
      page: computed,
      limit: computed,
      offset: computed,
      setPage: action,
      setLimit: action
    });

    this.RouterStore = RouterStore;
  }

  get _params() {
    return new URLSearchParams(this.RouterStore.params || '');
  }

  get limit() {
    return Number(this._params.get('limit')) || 12;
  }

  get page() {
    return Number(this._params.get('page')) || 1;
  }

  get offset() {
    return (this.page - 1) * this.limit;
  }

  setPage = (page) => {
    const {_params} = this;

    _params.set('page', page);

    this.RouterStore.history.push({
      search: _params.toString()
    });
  };

  setLimit = (limit) => {
    const {_params} = this;

    _params.set('limit', limit);
    _params.set('page', '1');

    this.RouterStore.history.push({
      search: _params.toString()
    });
  };
}
