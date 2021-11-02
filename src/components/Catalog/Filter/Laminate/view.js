import React from 'react';
import {Provider} from 'mobx-react';
import {LaminateStore} from '../../../../stores/Filter/LaminateStore';
import Fields from './fields';

class LaminateFilterView extends React.Component {
  constructor(props) {
    super(props);

    this.FilterStore = new LaminateStore();
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

LaminateFilterView.CATEGORY = LaminateStore.category;

export default LaminateFilterView;