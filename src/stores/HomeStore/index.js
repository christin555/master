import {observable, makeObservable} from 'mobx';
import {status as statusEnum} from '../../enums';

class HomeStore {
    RouterStore

    @observable promos = [];
    @observable inited = false;
    @observable status = statusEnum.LOADING;

    constructor({RouterStore}) {
      this.RouterStore = RouterStore;
      makeObservable(this);
    }
}

export default HomeStore;
