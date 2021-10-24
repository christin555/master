import {observable, get, action, makeObservable, computed} from 'mobx';

class RouterStore {
    @observable location = {};

    match = {};
    history = {};

    constructor() {
      makeObservable(this, {
        location: observable,
        match: observable,
        history: observable,
        setRoute: action,
        getParam: action
      });
    }

    @computed get pathname() {
      return this.location.pathname;
    }

    @computed get params() {
      return get(this.location, 'search') || null;
    }

    setRoute(location, match, history) {
      this.location = location;
      this.match = match;
      this.history = history;
    }

    getParam = (param) => {
      const urlAddress = new URLSearchParams(this.params || '');

      console.log('urlAddress', this.params, urlAddress);

      return urlAddress.get(param);
    }
}

export default new RouterStore();
