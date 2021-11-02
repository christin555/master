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

  @action clearCheckedCollections = () => {
    const params = new URLSearchParams(this.RouterStore.params || '');

    params.delete('collectionId');

    this.RouterStore.history.push({search: params.toString()});
    this.setToKey('checked', 'collectionId', false);
  };

  @action disableCollectionsByBrandId = (brandId, checked) => {
    const brandIds = Object.keys(this.checked)
      .filter((key) => key.indexOf('brandId') > -1 && this.checked[key])
      .map((key) => Number(key.split('-')[1]));

    // Если ничего не выбрано в брендах, то все коллекции по умолчанию можно тыкать
    if (!brandIds.length) {
      this.setToKey('disabled', 'collectionId', false);

      return;
    }

    this.collections.forEach((collection) => {
      const brId = collection.brandId;

      let state;

      if (checked) {
        // Дизейблим если бренд текущего элемента не был выбран в фильтре
        state = !brandIds.includes(brId) && brId !== brandId;
      } else {
        // Если бренд в фильтре был выбран, а потом чекбокс убрали,
        // то необходимо снова задизейблить
        state = !brandIds.includes(brandId) && brId === brandId;
      }

      this.setDisabled('collectionId', collection.id, state);
    });
  };

  clear() {
    super.clear();

    this.disabled = {};
  }

  afterValueCheck = (key, id, checked) => {
    if (key === 'brandId') {
      this.clearCheckedCollections();
      this.disableCollectionsByBrandId(id, checked);
    }
  };

  setToKey = (field, key, value) => {
    Object.keys(this[field])
      .forEach((objectKey) => {
        if (objectKey.indexOf(key) > -1) {
          this[field][objectKey] = value;
        }
      });
  };

  setDisabled = (key, value, state) => {
    this.disabled[`${key}-${value}`] = state;
  };
}