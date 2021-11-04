import React from 'react';
import {inject, Provider} from 'mobx-react';
import {LaminateStore} from '../../../../stores/Filter/LaminateStore';
import Fields from './fields';

@inject(({RootStore}) => {
  return {
    RootStore
  };
})
class LaminateFilterView extends React.Component {
  constructor(props) {
    super(props);

    const {RootStore} = this.props;

    this.FilterStore = new LaminateStore(RootStore);
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