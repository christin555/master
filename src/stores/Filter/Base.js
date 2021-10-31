import {action, observable} from 'mobx';
import api from '../../api';
import {alert} from '../Notifications';

export class FilterStore {
  @observable values = {};
  @observable selectedValues = {};

  constructor(category) {
    this.category = category;
  }

  @action setValues(values) {
    this.values = values;
  }

  @action setFilterValue = (key, value) => {
    this.selectedValues[key] = value;
  };

  getBody() {
    return {
      category: this.category
    };
  }

  async loadValues() {
    try {
      const values = await api.post('catalog/getFilterFields', this.getBody());

      this.setValues(values);
    } catch(e) {
      alert({type: 'error', title: 'Ошибка при получении фильтра'});
    }
  }

  toJSON() {
    throw new Error('need to implement in children');
  }

  toPath() {
    throw new Error('need to implement in children');
  }
}