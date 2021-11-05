import {observable, action, makeObservable} from 'mobx';
import {status as statusEnum} from '../../enums';
import api from '../../api';
import {alert} from '../Notifications';

class HomeStore {
    RouterStore

    @observable isShow;
    @observable status = statusEnum.LOADING;
    @observable name;
    @observable phone;

    constructor({RouterStore}) {
      this.RouterStore = RouterStore;

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

    checkFields = () => this.phone && this.name

    apply = (product) => {
      const isreq = this.checkFields();

      if (!isreq) {
        alert({type: 'warning', title: 'Заполните контактную информацию!'});

        return;
      }
      this.sendEmail(product);
      this.toggleShow();
    }

    sendEmail = async(_product) => {
      const {phone, name} = this;
      const product = this.getProduct(_product);

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
