import React from 'react';
import {Provider} from 'mobx-react';
import {DoorsStore} from './store';
import Fields from './fields';

class DoorsFilterView extends React.Component {
  constructor(props) {
    super(props);

    this.FilterStore = new DoorsStore();
  }

  componentDidMount() {
    this.FilterStore.loadValues();
  }

  render() {
    return (
      <Provider FilterStore={this.FilterStore}>
        <Fields />
      </Provider>
    );
  }
}

DoorsFilterView.CATEGORY = DoorsStore.category;

export default DoorsFilterView;