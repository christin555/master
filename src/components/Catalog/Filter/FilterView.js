import React from 'react';
import s from './Filter.module.scss';
import {Accordion, AccordionSummary, FormControlLabel, AccordionDetails, Typography} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import {inject} from 'mobx-react';
import {renderFilterFields} from './renderFilterFields.js';
import {toJS} from 'mobx';

@inject(({CatalogStore, FilterStore}) => {
  return {
    isLastLevel: CatalogStore.isLastLevel,
    isFastFilterEnabled: CatalogStore.isFastFilterEnabled,
    filterFields: FilterStore.filterFields,
    filterValues: toJS(FilterStore.filterValues || {}),
    setFilterValues: FilterStore.setFilterValues
  };
})
class Filter extends React.Component {
  render() {
    const {
      isLastLevel,
      isFastFilterEnabled,
      filterFields,
      filterValues,
      setFilterValues
    } = this.props;

    if (!isLastLevel || isFastFilterEnabled) {
      return null;
    }

    return filterFields.lenght && (
      <div className={s.filter}>
        <div className={s.title}>Фильтр</div>
        {renderFilterFields({filterFields, filterValues, setFilterValues})}
      </div>
    ) || null;
  }
}

export default Filter;
