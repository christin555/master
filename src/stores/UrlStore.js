import {makeObservable, observable, action, toJS, computed} from 'mobx';
import RouterStore from './Router';

class Checkbox {
  data = {};

  constructor() {
    makeObservable(this, {
      set: action,
      del: action,
      size: computed
    });
  }

  set = (key, value) => {
    if (this.data[key]) {
      this.data[key].push(value);
    } else {
      this.data[key] = [value];
    }
  };

  del = (key, value, comparer) => {
    const checked = this.data[key];
    let cmp = comparer;

    if (!cmp) {
      cmp = (check) => JSON.stringify(check) === JSON.stringify(value);
    }

    const newChecked = checked.filter(cmp);

    if (newChecked.length === 0) {
      delete this.data[key];
    } else {
      this.data[key] = newChecked;
    }
  };

  size() {
    return this;
  }
}

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

  set = (key, value) => {
    if (this.forUrl.has(key)) {
      this.forUrl.get(key).add(value);
    } else {
      this.forUrl.set(key, new Set([value]));
    }
  };

  del = (key, value) => {
    const set = this.forUrl.get(key);

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

  toJSON() {
    const urlSearch = {};

    this.forUrl.forEach((set, key) => {
      urlSearch[key] = [...set];
    });

    return urlSearch;
  }

  toPATH() {

  }

  clear = () => {
    this.forUrl.clear();
  };
}

// Global store
export default new UrlStore();