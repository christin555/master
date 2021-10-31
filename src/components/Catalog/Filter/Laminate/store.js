import {computed, makeObservable} from 'mobx';
import {FilterStore} from '../Base';

export class LaminateStore extends FilterStore {
  constructor() {
    super(LaminateStore.category);

    makeObservable(this);
  }

  static get category() {
    return 'laminate';
  }

  @computed get colorFamily() {
    return this.values.colorFamily;
  }

  @computed get resistanceClasses() {
    return this.values.resistanceClasses;
  }

  @computed get thickness() {
    return this.values.thickness;
  }

  @computed get width() {
    return this.values.width;
  }

  @computed get brands() {
    return this.values.brands;
  }

  @computed get collections() {
    return this.values.collections;
  }

  toJSON() {
    return this.selectedValues;
  }
}