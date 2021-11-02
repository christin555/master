import React from 'react';
import {Provider} from 'mobx-react';
import {CallmeStore} from '../../stores/CallmeStore';
import CallmeView from './CallmeView';

class Callme extends React.Component {
  constructor(props) {
    super(props);
    const {product} = this.props;

    this.CallmeStore = new CallmeStore({product});
  }

  render() {
    return (
      <Provider CallmeStore={this.CallmeStore}>
        <CallmeView {...this.props} />
      </Provider>
    );
  }
}

export default Callme;
