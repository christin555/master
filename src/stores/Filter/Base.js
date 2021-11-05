import {action, computed, makeObservable, observable} from 'mobx';
import api from '../../api';
import {alert} from '../Notifications';

const groupParamsByKey = (params) => {
  const p = {};

  [...params].forEach(([key, value]) => {
    const _n = Number(value);

    if (p[key]) {
      p[key].push(_n);
    } else {
      p[key] = [_n];
    }
  });

  return p;
};

export class BaseFilterStore {
  @observable values = {};
  @observable checked = {};
  @observable chips = [];
  // Override in child;
  fieldsLabel = {};

  constructor(category, RootStore) {
    this.category = category;
    this.RootStore = RootStore;

    this.initChecked();

    makeObservable(this, {
      clear: action.bound
    });
  }

  get RouterStore() {
    return this.RootStore.RouterStore;
  }

  @computed get currentParams() {
    const params = new URLSearchParams(this.RouterStore.params || '');

    params.delete('limit');
    params.delete('page');

    return params;
  }

  @computed get selectedFilter() {
    return groupParamsByKey(this.currentParams);
  }

  @computed get isActive() {
    return Object.keys(this.checked)
      .filter((k) => this.checked[k] === true).length > 0;
  }

  @action _setValues(values) {
    this.values = values;
  }

  clear() {
    this.clearPath();
    this.checked = {};
  }

  @action initChecked() {
    [...this.currentParams].forEach(([key, value]) => {
      this.checked[`${key}-${value}`] = true;
    });
  }

  clearPath() {
    const params = new URLSearchParams(this.RouterStore.params || '');

    const saveKey = ['limit', 'page'];

    [...params].forEach(([k]) => {
      if (!saveKey.includes(k)) {
        params.delete(k);
      }
    });

    this.RouterStore.history.push({search: params.toString()});
  }

  getBody() {
    return {
      category: this.category
    };
  }

  // Тут можно переопределить логику после выбора элемента
  afterValueCheck() {
    // implement in child
  }

  // Тут можно переопределить логику до выбора элемента
  beforeValueCheck() {
    // implement in children
  }

  setValue = (key) => async(checked, item) => {
    const {id} = item;

    await this.resetPage();
    await this.beforeValueCheck(key, item, checked);

    await this.setPath(key, id, checked);
    this.setChecked(key, id, checked);
    this.setChips(key, item, checked);

    await this.afterValueCheck(key, item, checked);
  };

  hasValue = (key, id) => this.checked[`${key}-${id}`];

  hasKey = (key) => Object
    .keys(this.checked)
    .filter((checkedKey) => checkedKey.indexOf(key) > -1 && this.checked[checkedKey] === true).length > 0;

  resetPage = () => {
    this.RootStore.PageStore.setPage(1);
  };

  async loadValues() {
    try {
      const values = await api.post('catalog/getFilterFields', this.getBody());

      this._setValues(values);
    } catch(e) {
      alert({type: 'error', title: 'Ошибка при получении фильтра'});
    }
  }

  @action setChecked = (key, value, state) => {
    const prefix = `${key}-${value}`;

    this.checked[prefix] = state;
  };

  @action setChips = (key, item, checked) => {
    if (checked) {
      this.chips.push({
        fieldName: this.fieldsLabel[key],
        label: item.name,
        key,
        val: item.id
      });
    } else {
      const idx = this.chips.findIndex((chip) => {
        return chip.key === key && chip.val === item.id;
      });

      this.chips.splice(idx, 1);
    }
  };

  setPath(key, id, checked) {
    const urlSearch = new URLSearchParams(this.RouterStore.params || '');

    if (checked) {
      if (urlSearch.getAll(key).includes(String(id))) {
        return;
      }

      urlSearch.append(key, id);
    } else {
      const vals = urlSearch.getAll(key);
      const idx = vals.findIndex((v) => v === String(id));

      // Удаляем элемент если по элемент был убран из checked
      vals.splice(idx, 1);

      urlSearch.delete(key);

      vals.forEach((v) => urlSearch.append(key, v));
    }

    this.RouterStore.history.push({
      search: urlSearch.toString()
    });
  }
}