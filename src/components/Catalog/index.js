import React from 'react';
import {inject, Provider} from 'mobx-react';
import {CatalogStore} from '../../stores/CatalogStore';
import CatalogView from './CatalogView';
import {PageStore} from '../../stores/CatalogStore/PageStore';

@inject(({RouterStore, UrlStore}) => {
  return {RouterStore, UrlStore};
})
class Catalog extends React.Component {
  constructor(props) {
    super(props);
    const {RouterStore, UrlStore} = this.props;

    this.PageStore = new PageStore(RouterStore);
    this.CatalogStore = new CatalogStore(RouterStore, this.PageStore, UrlStore);
  }

  componentWillUnmount() {
    this.CatalogStore.closeStore();
  }

  render() {
    return (
      <Provider
        CatalogStore={this.CatalogStore}
        PageStore={this.PageStore}
      >
        <CatalogView />
      </Provider>
    );
  }
}

export default Catalog;
