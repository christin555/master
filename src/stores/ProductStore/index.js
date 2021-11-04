import {observable, get, action, computed, makeObservable} from 'mobx';
import {status as statusEnum} from '../../enums';
import api from 'api';
import {alert} from '../Notifications';

class ProductStore {
  RouterStore

  @observable status = statusEnum.LOADING;
  @observable hierarchy;
  @observable values;
  @observable fields;

  constructor({RouterStore}) {
    this.RouterStore = RouterStore;
    makeObservable(this);

    this.getProduct();
    this.getHierarchy();
  }

  @computed get alias() {
    return get(get(this.RouterStore.match, 'params'), 'id') || null;
  }

  @action setValues = (values) => {
    this.values = values;
  }

  @action setFields = (fields) => {
    this.fields = fields;
  }

  @action setHierarchy = (hierarchy) => {
    this.hierarchy = hierarchy;
  }

  getHierarchy = async() => {
    try {
      const body = {product: this.alias};
      const {hierarchy} = await api.post('catalog/getHierarchy', body);

      this.setHierarchy(hierarchy);
    } catch(_) {
      alert({type: 'error', title: 'Ошибка при получении иерархии'});
    }
  }

  getProduct = async() => {
    try {
      const {values, fields} = await api.get(`products/get/${this.alias}`);

      this.setValues(values);
      this.setFields(fields);
    } catch(_) {
      alert({type: 'error', title: 'Ошибка при получении товара'});
    }
  }
}

export {ProductStore};
