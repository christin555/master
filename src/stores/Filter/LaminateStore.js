import {computed, makeObservable, observable, action} from 'mobx';
import {BaseFilterStore} from './Base';

export class LaminateStore extends BaseFilterStore {
  @observable disabled = {};

  constructor(RootStore) {
    super(LaminateStore.category, RootStore);

    RootStore.register('LaminateStore', this);

    makeObservable(this);
  }

  static get category() {
    return 'laminate';
  }

  @computed get color() {
    return this.values.color;
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

  beforeValueCheck = (key, checked, id) => {
    if (key === 'brandId' && checked) {
      this.clearCheckedCollections();
    }
  };

  @action clearCheckedCollections = () => {
    const params = new URLSearchParams(this.RouterStore.params || '')

    params.delete('collectionId');

    this.RouterStore.history.push({search: params.toString()});

    Object.keys(this.checked)
      .forEach((key) => {
        if (key.indexOf('collectionId') > -1) {
          this.checked[key] = false;
        }
      });
  };

  @action disableCollectionsByBrandId(brandId) {
    console.log(brandId);
  }
}