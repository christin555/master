import React from 'react';
import s from './Content.module.scss';
import {inject} from 'mobx-react';
import CloseIcon from '@material-ui/icons/Close';
import Chip from '../../../shared/Chip';
import {array2Object} from '../../../utils';

@inject(({RootStore: {ActiveFilterStore}}) => {
  return {
    filterFields: [],
    filterValues: {},
    // del: ActiveFilterStore.
  };
})
class Chips extends React.Component {
  get splittedValues() {
    const {filterValues, filterFields} = this.props;

    if (!filterFields) {
      return [];
    }

    return Object.entries(filterValues).reduce((arr, [_key, val]) => {
      const key = filterFields[_key]?.title;

      if (Array.isArray(val)) {
        const values = array2Object(filterFields[_key]?.values, 'id');

        if (values) {
          val.forEach((item) => {
            const itemVal = values[item]?.name;

            arr.push({label: `${key} - ${itemVal}`, val: item, key: _key});
          });
        }
      } else {
        arr.push({label: `${key} - ${val}`, val, key: _key});
      }

      return arr;
    }, []);
  }

  removeValue = (key, val) => this.props.del(key, val);

  render() {
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
            onDelete={this.removeValue(key, val)}
          />
        ))}
      </div>
    );
  }
}

export default Chips;
