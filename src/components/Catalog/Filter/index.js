import React from 'react';
import {inject, Provider} from 'mobx-react';
import FilterStore from '../../../stores/CatalogStore/FilterStore';
import FilterView from './FilterView';

@inject(({CatalogStore}) => {
  return {CatalogStore};
})
class Search extends React.Component {
  constructor(props) {
    super(props);

    this.FilterStore = props.CatalogStore.FilterStore;
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
