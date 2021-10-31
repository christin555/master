import React from 'react';
import s from './Filter.module.scss';
import {inject} from 'mobx-react';
import CloseIcon from '@material-ui/icons/Close';
import Button from '../../../shared/Button';

// @inject(({CatalogStore, FilterStore}) => {
//   return {
//     isLastLevel: CatalogStore.isLastLevel,
//     isFastFilterEnabled: CatalogStore.isFastFilterEnabled,
//     clear: FilterStore.clear
//   };
// })
class Filter extends React.Component {
  // get isFilterActive() {
  //   return !!Object.keys(this.props.filterValues).length;
  // }

  render() {
    // const {
    //   isLastLevel,
    //   isFastFilterEnabled,
    //   filterFields,
    //   clear,
    //   children
    // } = this.props;
    //
    // if (!isLastLevel || isFastFilterEnabled) {
    //   return null;
    // }

    return (
      <div className={s.filter}>
        <div className={s.title}>
          <span>
            {'Фильтр'}
          </span>
          {
            this.isFilterActive && (
              <Button
                // onClick={clear}
                className={s.clear}
                size={'small'}
                endIcon={<CloseIcon />}
              >
                {'Очистить'}
              </Button>
            ) || null
          }
        </div>
        {
          this.props.children
        }
      </div>
    );
  }
}

export default Filter;
