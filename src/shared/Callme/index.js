import React from 'react';
import {inject, Provider} from 'mobx-react';
import CallmeStore from '../../stores/CallmeStore';
import CallmeView from './CallmeView';

@inject(({RouterStore}) => {
  return {RouterStore};
})
class Search extends React.Component {
  constructor(props) {
    super(props);
    const {RouterStore} = this.props;

    this.CallmeStore = new CallmeStore({RouterStore});
  }

  render() {

    return (
      <Provider CallmeStore={this.CallmeStore}>
        <CallmeView {...this.props} />
      </Provider>

    );
  }
}

export default Search;
