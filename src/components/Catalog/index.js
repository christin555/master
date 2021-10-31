import React from 'react';
import {inject, Provider} from 'mobx-react';
import {CatalogStore} from '../../stores/CatalogStore';
import CatalogView from './CatalogView';

@inject(({RouterStore, UrlStore}) => {
  return {RouterStore, UrlStore};
})
class Search extends React.Component {
  constructor(props) {
    super(props);
    const {RouterStore, UrlStore} = this.props;

    this.CatalogStore = new CatalogStore({RouterStore, UrlStore});
  }

  render() {
    return (
      <Provider CatalogStore={this.CatalogStore}>
        <CatalogView />
      </Provider>
    );
  }
}
export default Search;
