import React from 'react';
import {inject, Provider} from 'mobx-react';
import FilterStore from '../../../stores/CatalogStore/FilterStore';
import FilterView from './FilterView';

@inject(({RouterStore, CatalogStore}) => {
  return {RouterStore, CatalogStore};
})
class Search extends React.Component {
  constructor(props) {
    super(props);
    const {RouterStore, CatalogStore} = this.props;

    this.FilterStore = new FilterStore({RouterStore, CatalogStore});
  }

  render() {
    return (
      <Provider FilterStore={this.FilterStore}>
        <FilterView />
      </Provider>
    );
  }
}
export default Search;
