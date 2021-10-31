import React from 'react';
import s from './Filter.module.scss';
import {inject} from 'mobx-react';
import CloseIcon from '@material-ui/icons/Close';
import Button from '../../../shared/Button';

@inject(({UrlStore}) => {
  return {
    isActive: UrlStore.isActive,
    clear: UrlStore.clear
  };
})
class FilterTitle extends React.Component {
  render() {
    const {
      clear,
      isActive
    } = this.props;

    return (
      <div className={s.title}>
        <span>{'Фильтр'}</span>
        {
          isActive && (
            <Button
              onClick={clear}
              className={s.clear}
              size={'small'}
              endIcon={<CloseIcon />}
            >
              {'Очистить'}
            </Button>
          ) || null
        }
      </div>
    );
  }
}

export {FilterTitle};
