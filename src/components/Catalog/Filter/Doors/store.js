import {computed, makeObservable} from 'mobx';
import {FilterStore} from '../Base';

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

  toJSON() {
    return this.values;
  }
}