import {observable, action, makeObservable} from 'mobx';
import {status as statusEnum} from '../../enums';
import api from '../../api';
import {alert} from '../Notifications';

class CallmeStore {
  product;

  @observable isShow;
  @observable status = statusEnum.LOADING;
  @observable name;
  @observable phone;

  constructor({product}) {
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

    apply = (product) => {
      const isreq = this.checkFields();

    if (!isreq) {
      alert({type: 'warning', title: 'Заполните контактную информацию!'});

      return;
    }
    this.sendEmail(product);
    this.toggleShow();
    this.product = null;
  }

  getProduct = (product) => {
    if (!product) {
      return null;
    }

    return {
      id: product.id,
      name: product.name,
      img: product.imgs[0]?.src
    };
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

export {CallmeStore};
