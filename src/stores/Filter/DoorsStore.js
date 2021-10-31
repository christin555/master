import {computed, makeObservable} from 'mobx';
import {FilterStore} from './Base';
import UrlStore from '../UrlStore';

export class DoorsStore extends FilterStore {
  constructor() {
    super(DoorsStore.category);

    makeObservable(this);
  }

  static get category() {
    return 'doors';
  }

  @computed get collections() {
    return this.values.collections;
  }

  @computed get finishingMaterials() {
    return this.values.finishingMaterials;
  }

  setValue = (key) => (checked, {id}) => {
    if (!checked) {
      UrlStore.del(key, id);
    } else {
      UrlStore.set(key, id);
    }
  };

  toJSON() {
    return this.selectedValues;
  }
}