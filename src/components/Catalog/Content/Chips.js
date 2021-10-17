import React from 'react';
import s from './Content.module.scss';
import {inject} from 'mobx-react';
import {toJS} from 'mobx';
import CloseIcon from '@material-ui/icons/Close';
import Chip from '../../../shared/Chip';
import {array2Object} from '../../../utils';

@inject(({CatalogStore: {FilterStore}}) => {
  return {
    filterFields: FilterStore.filterFieldsObject,
    filterValues: toJS(FilterStore.filterValues || {}),
    setFilterValues: FilterStore.setFilterValues,
    delVal: FilterStore.delVal
  };
})
class Filter extends React.Component {

  get isFilterActive() {
    return !!Object.keys(this.props.filterValues).length;
  }

  get splittedValues() {
    const {filterValues, filterFields} = this.props;

    if (!filterFields) {
      return [];
    }

    return Object.entries(filterValues).reduce((arr, [_key, val]) => {
      const key = filterFields[_key]?.title;

      if (Array.isArray(val)) {
        const values = array2Object(filterFields[_key]?.values, 'id');

        val.forEach((item) => {
          const itemVal = values[item]?.name;

          arr.push({label: `${key} - ${itemVal}`, val: item, key: _key});
        });
      } else {
        arr.push({label: `${key} - ${val}`, val, key: _key});
      }

      return arr;
    }, []);

  }

  render() {
    const {delVal} = this.props;

    if (!this.isFilterActive) {
      return null;
    }

    return (
      <div className={s.chips}>
        {this.splittedValues.map(({label, key, val}, index) => (
          <Chip
            key={index}
            color={'primary'}
            label={label}
            deleteIcon={<CloseIcon />}
            onDelete={() => delVal(key, val)}
          />
        ))}
      </div>
    );
  }
}

export default Filter;
