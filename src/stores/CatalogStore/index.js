import {observable, get, reaction, action, autorun, computed, makeObservable} from 'mobx';
import {status as statusEnum} from '../../enums';
import api from 'api';
import {alert} from '../Notifications';
import FilterStore from './FilterStore';

class CatalogStore {
    RouterStore
    FilterStore

    @observable status = statusEnum.LOADING;
    @observable cards;
    @observable hierarchy;
    @observable isLastLevel;
    @observable count = 0;

    @observable offset = 0;
    @observable limit = 20;

    constructor({RouterStore, CatalogStore}) {
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

      this.FilterStore = new FilterStore({RouterStore, CatalogStore: this});
    }

    @computed get category() {
      return get(get(this.RouterStore.match, 'params'), 'category') || null;
    }

    @computed get isFastFilterEnabled() {
      return !!this.urlParams?.search;
    }

    @computed get filter() {
      const searchParams = new URLSearchParams(this.RouterStore.params || {});
      const filter = {};

      for (const pair of searchParams.entries()) {
        const items = pair[1]
          .split(',')
          .map((item) => Number(item.trim()))
          .filter(Boolean);

        filter[pair[0]] = items;
      }

      return filter;
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
      const urlParams = new URLSearchParams();

      for (const [key, value] of Object.entries(filter)) {
        if (!(!value || Array.isArray(value) && !value.length)) {
          urlParams.append(key, value);
        }
      }

      this.RouterStore.history.push({
        search: urlParams.toString()
      });
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
      const {category, filter} = this;

      try {
        const body = {searchParams: {category, filter}};

        const count = await api.post('catalog/countProducts ', body);

        this.setCount(count);
      } catch(_) {
        alert({type: 'error', title: 'Ошибка при подсчете товаров'});
      }
    }

    getCatalog = async() => {
      const {category, limit, offset, filter} = this;

      this.setStatus(statusEnum.LOADING);
      this.setCards([]);

      try {
        const body = {searchParams: {category, filter}, limit, offset};
        const cards = await api.post('catalog/getCatalog', body);

        this.setCards(cards);
        this.setStatus(statusEnum.SUCCESS);
      } catch(_) {
        this.setStatus(statusEnum.ERROR);
        alert({type: 'error', title: 'Ошибка при получении иерархии'});
      }
    }
}

export default CatalogStore;
