import {observable, reaction, action, toJS, computed, makeObservable} from 'mobx';
import {status as statusEnum} from '../../enums';
import api from 'api';
import {alert} from '../Notifications';
import {array2Object} from '../../utils';

class FilterStore {
    RouterStore

    @observable status = statusEnum.LOADING;
    @observable filterFields;

    constructor({RouterStore, CatalogStore}) {
      this.RouterStore = RouterStore;
      this.CatalogStore = CatalogStore;

      makeObservable(this);

      reaction(
        () => this.CatalogStore.category,
        this.getFilterFields,
        {fireImmediately: true}
      );
    }

    @computed get filterFieldsObject() {
      return array2Object(this.filterFields, 'name');
    }

    @computed get filterValues() {
      return this.CatalogStore.filter;
    }

    @action setStatus = (status) => {
      this.status = status;
    }

    @action setFilterFields = (filterFields) => {
      this.filterFields = filterFields;
    }

    delVal = (name, value) => {
      const filter = toJS(this.filterValues);

      if (Array.isArray(filter[name])) {
        filter[name] = filter[name].filter((id) => !id === value);
      }

      this.CatalogStore.setFilter(filter);
    }

    setFilterValues = (name, value) => {
      let filter = toJS(this.filterValues);

      if (!filter) {
        filter = {[name]: value};
      } else {
        filter[name] = value;
      }

      this.CatalogStore.setFilter(filter);
    }

    getFilterFields = async() => {
      const {category, urlParams} = this.CatalogStore;

      this.setStatus(statusEnum.LOADING);
      this.setFilterFields([]);

      try {
        const body = {category, ...urlParams};
        const filterFields = await api.post('catalog/getFilterFields', body);

        this.setFilterFields(filterFields);
        this.setStatus(statusEnum.SUCCESS);
      } catch(_) {
        this.setStatus(statusEnum.ERROR);
        alert({type: 'error', title: 'Ошибка при получении фильтра'});
      }
    }

    clear = () => {
      this.CatalogStore.setFilter({});
    }
}

export default FilterStore;
