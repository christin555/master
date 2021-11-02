import {action, computed, makeObservable} from 'mobx';
import {BaseFilterStore} from './Base';
import UrlStore from '../UrlStore';

export class DoorsStore extends BaseFilterStore {
  constructor() {
    super(DoorsStore.category);

    makeObservable(this);

    UrlStore.setClear(this.clear);
    // UrlStore.setToJSON(this.toJSON);
  }

  static get category() {
    return 'doors';
  }

  @computed get selectedFilter() {
    // В данной реализации структура this.checked подходит
    // лишь для примитивных типов например только числа, или строки
    // поэтому если кто-то надумает отправлять на бэк что-то кроме id
    // то необходимо будет переработать структуру, либо дополнить код
    const entries = Object.entries(this.checked);
    const filter = {};

    for (const [key, val] of entries) {
      if (val === false) {
        continue;
      }

      const [kkey, id] = key.split('-');

      const nId = Number(id);

      if (filter[kkey]) {
        filter[kkey].push(nId);
      } else {
        filter[kkey] = [nId];
      }
    }

    return filter;
  }

  @computed get collections() {
    return this.values.collections;
  }

  @computed get finishingMaterials() {
    return this.values.finishingMaterials;
  }

  setValue = (key) => (checked, {id}) => {
    this.setChecked(key, id, checked);
  };

  // toJSON = () => {
  //
  // };

  @action clear = () => {
    this.checked = {};
  };
}