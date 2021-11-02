import React from 'react';
import s from './Content.module.scss';
import {inject} from 'mobx-react';
import CloseIcon from '@material-ui/icons/Close';
import Chip from '../../../shared/Chip';

@inject(({RootStore: {ActiveFilterStore}}) => {
  return {
    chips: ActiveFilterStore.chips,
    isFilterActive: ActiveFilterStore.isActive,
    del: ActiveFilterStore.setValue
  };
})
class Chips extends React.Component {
  removeValue = (key, val) => () => this.props.del(key)(false, {id: val});

  render() {
    if (!this.props.isFilterActive) {
      return null;
    }

    return (
      <div className={s.chips}>
        {this.props.chips.map(({fieldName, label, key, val}) => (
          <Chip
            key={val}
            color={'primary'}
            label={`${fieldName} - ${label}`}
            deleteIcon={<CloseIcon />}
            onDelete={this.removeValue(key, val)}
          />
        ))}
      </div>
    );
  }
}

export default Chips;
