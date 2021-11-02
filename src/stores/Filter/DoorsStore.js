import {computed, makeObservable} from 'mobx';
import {BaseFilterStore} from './Base';

export class DoorsStore extends BaseFilterStore {
  constructor(RootStore) {
    super(DoorsStore.category, RootStore);
    RootStore.register('DoorsStore', this);

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

  @computed get isFinishingMaterialActive() {
    return this.hasKey('finishingMaterial');
  }

  @computed get isCollectionActive() {
    return this.hasKey('collectionId');
  }
}