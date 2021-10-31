import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FilterView from './FilterView';
import {inject, Provider} from 'mobx-react';
import {get} from 'mobx';
import {filterFabric} from './filterFabric';

@inject(({RouterStore}) => {
  return {
    RouterStore
  };
})
class Filter extends Component {
  get category() {
    return get(get(this.props.RouterStore.match, 'params'), 'category') || null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.category) {
      console.log(this.category, filterFabric(this.category));
    }
  }

  componentDidMount() {
    console.log('mount', this.category);
  }

  render() {
    // const {Fields, Store} = filterFabric(this.category);
    //
    // this.FilterStore = new Store();


    return (
      <FilterView>
        {/*<Provider FilterStore={this.FilterStore}>*/}
        {/*  <Fields />*/}
        {/*</Provider>*/}
      </FilterView>
    );
  }
}

Filter.propTypes = {
  FilterStore: PropTypes.object,
  RouterStore: PropTypes.object
};

export default Filter;
