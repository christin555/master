import React from 'react';
import {inject, Provider} from 'mobx-react';
import ArticlesStore from '../../stores/ArticlesStore';
import ArticlesView from './ArticlesView';

@inject(({RouterStore}) => {
  return {RouterStore};
})
class Search extends React.Component {
  constructor(props) {
    super(props);
    const {RouterStore} = this.props;

    this.ArticlesStore = new ArticlesStore({RouterStore});
  }

  render() {
    return (
      <Provider ArticlesStore={this.ArticlesStore}>
        <ArticlesView />
      </Provider>
    );
  }
}

export default Search;
