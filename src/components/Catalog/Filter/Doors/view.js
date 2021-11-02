import React from 'react';
import {inject, Provider} from 'mobx-react';
import {DoorsStore} from '../../../../stores/Filter/DoorsStore';
import Fields from './fields';

@inject(({RootStore}) => {
  return {
    RootStore
  };
})
class DoorsFilterView extends React.Component {
  constructor(props) {
    super(props);

    const {RootStore} = this.props;

    this.FilterStore = new DoorsStore(RootStore);
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