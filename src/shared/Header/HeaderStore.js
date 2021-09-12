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

    setParams = () => {
      const params = {
        search: this.search
      };
      const urlParams = new URLSearchParams();

      for (const [key, value] of Object.entries(params)) {
        if (value) {
          urlParams.append(key, value);
        }
      }

      this.RouterStore.history.push({
        pathname: '/catalog',
        search: urlParams.toString()
      });

    }

}

export default HeaderStore;
