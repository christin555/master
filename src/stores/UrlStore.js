import {makeObservable, observable, action, computed} from 'mobx';

class UrlStore {
  forUrl = new Map();

  constructor() {
    makeObservable(this, {
      forUrl: observable,
      isActive: computed,
      set: action,
      clear: action,
      del: action,
      clearKey: action
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

  clear = () => {
    this.forUrl.clear();

    this.customClear && this.customClear();
  };

  setClear = (customClear) => {
    this.customClear = customClear;
  };

  setToJSON = (customJSON) => {
    this.customJSON = customJSON;
  };

  toJSON = () => {
    if (this.customJSON) {
      return this.customJSON();
    }

    return {};
  };
}

// Global store
export default new UrlStore();