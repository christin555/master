import React from 'react';
import {Provider} from 'mobx-react';
import {HomeStore} from '../../stores/HomeStore';
import s from './Home.module.scss';
import Blocks from './Blocks';
import Header from './Header';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.HomeStore = new HomeStore();
  }

  render() {
    return (
      <Provider HomeStore={this.HomeStore}>
        <div className={s.contentContainer}>
          <Header />
          <Blocks />
        </div>
      </Provider>
    );
  }
}
export default Home;
