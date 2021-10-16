import React from 'react';
import s from './Filter.module.scss';
import {Accordion, AccordionSummary, FormControlLabel, AccordionDetails} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';

const _setValue = ({name, value, setFilterValues, filterValues, type}) => {
  switch (type) {
    case 'checkbox':
      if (filterValues[name]) {
        if (filterValues[name].includes(value)) {
          setFilterValues(name, filterValues[name].filter((val) => val !== value));
        } else {
          setFilterValues(name, [...filterValues[name], value]);
        }
      } else {
        setFilterValues(name, [value]);
      }
      break;
  }
};

const getTypeField = ({name, type, values, setFilterValues, filterValues}) => {
  const _filterValues = filterValues[name];

  switch (type) {
    case 'checkbox':

      return values.map(({name: nameValue, id}) => (
        <FormControlLabel
          className={s.checkboxControl}
          key={id}
          control={(
            <Checkbox
              size={'small'}
              checked={Array.isArray(_filterValues) && _filterValues.includes(id)}
              onChange={() => _setValue({name, value: id, setFilterValues, filterValues, type})}
              name='checkedA'
            />
          )}
          label={nameValue}
        />
      ));
  }

};

const renderFilterFields = ({filterFields, setFilterValues, filterValues}) => filterFields.map(({
  id,
  name,
  type,
  title,
  values
}) => (
  <Accordion elevation={0} square={true} key={id} className={s.accordionItem}>
    <AccordionSummary className={s.summary} expandIcon={<ExpandMoreIcon />}>
      <span className={s.heading}> {title}
        {
          filterValues[name] && <span className={s.active} /> || null
        }
      </span>
    </AccordionSummary>
    <AccordionDetails className={s.details}>
      {getTypeField({name, type, values, setFilterValues, filterValues})}
    </AccordionDetails>
  </Accordion>
));

export {renderFilterFields};
