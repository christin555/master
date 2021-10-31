import {computed, makeObservable, toJS} from 'mobx';
import {FilterStore} from './Base';
import UrlStore from '../UrlStore';

export class LaminateStore extends FilterStore {
  constructor() {
    super(LaminateStore.category);

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
    const collections = this.values.collections || [];

    if (UrlStore.hasKey('brandId')) {
      return toJS(collections).map((collection) => {
        const isSameBrandCollection = UrlStore.has('brandId', collection.brandId);

        collection.disabled = isSameBrandCollection === false;

        return collection;
      });
    }

    return collections;
  }

  setCheckboxValue = (key) => (checked, {id}) => {
    if (key === 'brandId') {
      // Сбрасываем выбранные колллекции, если поменяли бренд
      UrlStore.clearKey('collectionId');
    }

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