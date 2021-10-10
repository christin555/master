import {observable, get, reaction, action, autorun, computed, makeObservable} from 'mobx';
import {status as statusEnum} from '../../enums';
import api from 'api';
import {alert} from '../Notifications';

class CatalogStore {
  RouterStore

  @observable filter;
  @observable status = statusEnum.LOADING;
  @observable cards;
  @observable hierarchy;
  @observable isLastLevel;
  @observable count = 0;

  @observable offset = 0;
  @observable limit = 20;

  constructor({RouterStore}) {
    this.RouterStore = RouterStore;
    autorun(this.getHierarchy);
    makeObservable(this);

    reaction(
      () => [this.offset, this.category, this.limit, this.RouterStore.params, this.filter],
      this.getCatalog,
      {fireImmediately: true}
    );

    reaction(
      () => [this.category, this.RouterStore.params, this.filter],
      this.getCountProducts,
      {fireImmediately: true}
    );
  }

  @computed get category() {
    return get(get(this.RouterStore.match, 'params'), 'category') || null;
  }

  @computed get isFastFilterEnabled() {
    return !!this.urlParams.search;
  }

  @computed get urlParams() {
    const urlAddress = new URLSearchParams(this.RouterStore.params || {});
    const search = urlAddress.get('search');

    return {search};
  }

  @action setCards = (cards) => {
    this.cards = cards;
  }

  @action setHierarchy = (hierarchy) => {
    this.hierarchy = hierarchy;
  }

  @action setIsLastLevel = (isLastLevel) => {
    this.isLastLevel = isLastLevel;
  }

  @action setCount = (count) => {
    this.count = count;
  }

  @action setOffset = (_, offset) => {
    this.offset = offset;
  }

  @action setLimit = ({target: value}) => {
    this.limit = value.value;
    this.offset = 0;
  }

  @action setStatus = (status) => {
    this.status = status;
  }

  @action setFilter = (filter) => {
    this.filter = filter;
  }

  getHierarchy = async() => {
    try {
      const body = {category: this.category};
      const {hierarchy, isLastLevel} = await api.post('catalog/getHierarchy', body);

      this.setHierarchy(hierarchy);
      this.setIsLastLevel(isLastLevel);
    } catch(_) {
      alert({type: 'error', title: 'Ошибка при получении иерархии'});
    }
  }

  getCountProducts = async() => {
    const {category, urlParams, filter} = this;

    try {
      const body = {searchParams: {category, ...urlParams, filter}};

      const count = await api.post('catalog/countProducts ', body);

      this.setCount(count);
    } catch(_) {
      alert({type: 'error', title: 'Ошибка при подсчете товаров'});
    }
  }

  getCatalog = async() => {
    const {category, limit, offset, urlParams, filter} = this;

    this.setStatus(statusEnum.LOADING);
    this.setCards([]);

    try {
      const body = {searchParams: {category, ...urlParams, filter}, limit, offset};
      const cards = await api.post('catalog/getCatalog', body);

      console.log(cards);

      this.setCards(cards);
      this.setStatus(statusEnum.SUCCESS);
    } catch(_) {
      this.setStatus(statusEnum.ERROR);
      alert({type: 'error', title: 'Ошибка при получении иерархии'});
    }
  }
}

export default CatalogStore;
