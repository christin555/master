import React from 'react';
import {Provider} from 'mobx-react';
import {PopularStore} from './Store';
import PopularView from './indexView';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.PopularStore = new PopularStore();
  }

  render() {
    return (
      <Provider PopularStore={this.PopularStore}>
        <PopularView />
      </Provider>
    );
  }
}
export default Home;
