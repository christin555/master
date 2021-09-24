import {observable, action, makeObservable} from 'mobx';
import {status as statusEnum} from '../../enums';
import api from '../../api';
import {alert} from '../Notifications';

class HomeStore {
  RouterStore
  product;

  @observable isShow;
  @observable status = statusEnum.LOADING;
  @observable name;
  @observable phone;

  constructor({RouterStore, product}) {
    this.RouterStore = RouterStore;
    this.product = product;
    makeObservable(this);
  }

  @action toggleShow = () => {
    this.isShow = !this.isShow;
  }

  @action setName = ({target: {value}}) => {
    this.name = value;
  }

  @action setPhone = ({target: {value}}) => {
    this.phone = value;
  }

  checkFields = () => this.phone && this.name

  apply = () => {
    const isreq = this.checkFields();

    if (!isreq) {
      alert({type: 'warning', title: 'Заполните контактную информацию!'});

      return;
    }
    this.sendEmail();
    this.toggleShow();
    this.product = null;
  }

  sendEmail = async() => {
    const {phone, product, name} = this;

    try {
      const body = {phone, product, name};

      await api.post('send/callme ', body);

      alert({
        type: 'success',
        title: 'Ваша заявка принята! Наш специалист свяжется с вами в ближайщее время'
      });
    } catch(_) {
      alert({type: 'error', title: 'Извините, произошла ошибка при создании заявки'});
    }
  }
}

export default HomeStore;
