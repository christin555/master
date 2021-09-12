import {observable, get, reaction, action, autorun, toJS, computed, makeObservable} from 'mobx';
import {status as statusEnum} from '../../enums';
import api from 'api';
import {alert} from '../Notifications';

class ArticlesStore {
    RouterStore

    @observable status = statusEnum.LOADING;
    @observable articles;

    constructor({RouterStore, CatalogStore}) {
      this.RouterStore = RouterStore;
      this.CatalogStore = CatalogStore;

      makeObservable(this);

      this.getArticles();
    }

    @action setStatus = (status) => {
      this.status = status;
    }

    @action setArticles = (articles) => {
      this.articles = articles;
    }

    getArticles = async() => {
      this.setStatus(statusEnum.LOADING);
      this.setArticles([]);
      try {
        const articles = await api.get('articles/getArticles');

        console.log(articles);

        this.setArticles(articles);
        this.setStatus(statusEnum.SUCCESS);
      } catch(_) {
        this.setStatus(statusEnum.ERROR);
        alert({type: 'error', title: 'Ошибка при получении фильтра'});
      }
    }
}

export default ArticlesStore;
