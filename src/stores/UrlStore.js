import {makeObservable, observable, action, computed} from 'mobx';
import RouterStore from './Router';

class UrlStore {
  forUrl = new Map();

  constructor() {
    makeObservable(this, {
      forUrl: observable,
      set: action,
      clear: action,
      isActive: computed,
      del: action
    });
  }

  get isActive() {
    return this.forUrl.size > 0;
  }

  get = (key) => this.forUrl.get(key);

  set = (key, value) => {
    if (this.forUrl.has(key)) {
      this.forUrl.get(key).add(value);
    } else {
      this.forUrl.set(key, new Set([value]));
    }
  };

  del = (key, value) => {
    const set = this.forUrl.get(key);

    if (!set) {
      return;
    }

    set.forEach((v) => {
      if (JSON.stringify(v) === JSON.stringify(value)) {
        set.delete(v);
      }
    });

    if (set.size === 0) {
      this.forUrl.delete(key);
    }
  };

  has = (key, value) => {
    if (this.forUrl.has(key)) {
      const set = this.forUrl.get(key);

      return set.has(value);
    }

    return false;
  };

  hasKey = (key) => this.forUrl.has(key);

  clearKey = (key) => {
    this.forUrl.delete(key);
  };

  toJSON() {
    const urlSearch = {};

    this.forUrl.forEach((set, key) => {
      urlSearch[key] = [...set];
    });

    return urlSearch;
  }

  toPATH(limit, offset) {
    const urlSearch = new URLSearchParams(RouterStore.params);

    this.forUrl.forEach((set, key) => {
      urlSearch.append(key, [...set]);
    });

    urlSearch.set('limit', limit);
    urlSearch.set('page', offset);

    RouterStore.history.push({
      search: urlSearch.toString()
    });
  }

  clear = () => {
    this.forUrl.clear();
  };
}

// Global store
export default new UrlStore();