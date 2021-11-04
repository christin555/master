import {observable, action, makeObservable} from 'mobx';

class HeaderStore {
    RouterStore

    @observable search;

    constructor({RouterStore}) {
      this.RouterStore = RouterStore;

      makeObservable(this);
    }

    @action setSearch = ({target: {value}}) => {
      this.search = value;
    }

    @action setParams = () => {
      const urlParams = new URLSearchParams();

      urlParams.set('search', this.search);

      this.search = '';

      this.RouterStore.history.push({
        pathname: '/catalog',
        search: urlParams.toString()
      });
    }
}

export default HeaderStore;
