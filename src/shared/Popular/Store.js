import {observable, get, action, computed, makeObservable} from 'mobx';
import api from 'api';

class PopularStore {
    RouterStore

    @observable popularProducts;

    constructor() {
      makeObservable(this);

      this.getPopularProducts();
    }

    @action setPopularProducts = (popularProducts) => {
      this.popularProducts = popularProducts;
    }

    getPopularProducts = async() => {
      try {
        const popular = await api.post(`products/getPopular`);

        this.setPopularProducts(popular);
        console.log('', popular);
      } catch(_) {
      }
    }
}

export {PopularStore};
