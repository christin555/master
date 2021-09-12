import React from 'react';
import {inject, Provider} from 'mobx-react';
import HeaderStore from './HeaderStore';
import HeaderView from './HeaderView';

@inject(({RouterStore}) => {
  return {RouterStore};
})
class Header extends React.Component {
  constructor(props) {
    super(props);
    const {RouterStore} = this.props;

    this.HeaderStore = new HeaderStore({RouterStore});
  }

  render() {
    return (
      <Provider HeaderStore={this.HeaderStore}>
        <HeaderView />
      </Provider>
    );
  }
}
export default Header;
