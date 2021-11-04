import React from 'react';
import {inject, Provider} from 'mobx-react';
import {CatalogStore} from '../../stores/CatalogStore';
import CatalogView from './CatalogView';
import {PageStore} from '../../stores/CatalogStore/PageStore';
import {RootStore} from '../../stores/RootStore';

@inject(({RouterStore, UrlStore}) => {
  return {RouterStore, UrlStore};
})
class Catalog extends React.Component {
  constructor(props) {
    super(props);
    const {RouterStore} = this.props;

    this.RootStore = new RootStore();

    this.RootStore.register('RouterStore', RouterStore);

    this.PageStore = new PageStore(RouterStore, this.RootStore);
    this.CatalogStore = new CatalogStore(RouterStore, this.RootStore);
  }

  componentWillUnmount() {
    this.CatalogStore.closeStore();
  }

  render() {
    return (
      <Provider
        RootStore={this.RootStore}
        CatalogStore={this.CatalogStore}
        PageStore={this.PageStore}
      >
        <CatalogView />
      </Provider>
    );
  }
}

export default Catalog;
