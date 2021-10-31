import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FilterView from './FilterView';
import {inject} from 'mobx-react';
import {get} from 'mobx';
import {filterFabric} from './filterFabric';

@inject(({RouterStore}) => {
  return {
    category: get(get(RouterStore.match, 'params'), 'category') || null
  };
})
class Filter extends Component {
  render() {
    const Fields = filterFabric(this.props.category);

    if (!Fields) {
      return null;
    }

    return (
      <FilterView>
        <Fields />
      </FilterView>
    );
  }
}

Filter.propTypes = {
  category: PropTypes.string
};

export default Filter;
