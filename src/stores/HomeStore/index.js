import {observable, get, action, reaction, when, toJS, computed, makeObservable} from 'mobx';
import {status as statusEnum} from '../../enums';

class HomeStore  {
    RouterStore

    @observable promos = [];
    @observable inited = false;
    @observable status = statusEnum.LOADING;

    constructor({RouterStore}) {
        this.RouterStore = RouterStore;
    }

}

export default HomeStore;
