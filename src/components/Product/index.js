import React from 'react';
import {inject, Provider} from 'mobx-react';
import ProductStore from '../../stores/ProductStore';
import ProductView from './ProductView';

@inject(({RouterStore}) => {
  return {RouterStore};
})
class Search extends React.Component {
  constructor(props) {
    super(props);
    const {RouterStore} = this.props;

    this.ProductStore = new ProductStore({RouterStore});
  }

  render() {
    return (
      <Provider ProductStore={this.ProductStore}>
        <ProductView />
      </Provider>
    );
  }
}
export default Search;
