import {action, observable} from 'mobx';
import api from '../../api';
import {alert} from '../Notifications';

export class BaseFilterStore {
  @observable values = {};
  @observable checked = {};

  constructor(category) {
    this.category = category;
  }

  @action _setValues(values) {
    this.values = values;
  }

  @action setChecked = (key, value, state) => {
    const prefix = `${key}-${value}`;

    this.checked[prefix] = state;
  };

  getBody() {
    return {
      category: this.category
    };
  }

  async loadValues() {
    try {
      const values = await api.post('catalog/getFilterFields', this.getBody());

      this._setValues(values);
    } catch(e) {
      alert({type: 'error', title: 'Ошибка при получении фильтра'});
    }
  }

  toJSON() {
    throw new Error('need to implement in children');
  }
}