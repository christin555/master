import React from 'react';
import {Provider} from 'mobx-react';
import {ArticlesStore} from '../../stores/ArticlesStore';
import ArticlesView from './ArticlesView';

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.ArticlesStore = new ArticlesStore();
  }

  render() {
    return (
      <Provider ArticlesStore={this.ArticlesStore}>
        <ArticlesView />
      </Provider>
    );
  }
}

export default Gallery;
