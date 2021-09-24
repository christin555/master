import React from 'react';
import s from './Content.module.scss';
import {TablePagination} from '@material-ui/core';
import Cards from '../../../shared/Cards';
import {inject} from 'mobx-react';
import EmptyBlock from '../../../shared/EmptyBlock';
import {status as statusEnum} from '../../../enums';

@inject(({CatalogStore}) => {
  return {
    cards: CatalogStore.cards || [],
    isLastLevel: CatalogStore.isLastLevel,
    count: CatalogStore.count,
    setOffset: CatalogStore.setOffset,
    setLimit: CatalogStore.setLimit,
    offset: CatalogStore.offset,
    limit: CatalogStore.limit,
    status: CatalogStore.status,
    isFastFilterEnabled: CatalogStore.isFastFilterEnabled
  };
})
class Content extends React.Component {
  getPagination = (withCount) => {
    const {
      isLastLevel,
      isFastFilterEnabled,
      count,
      setOffset,
      setLimit,
      offset,
      limit
    } = this.props;

    return (isLastLevel || isFastFilterEnabled) && (
      <div className={s.header}>
        <div className={s.count}>
          {withCount && `${count} товаров` || null}
        </div>
        {
          <TablePagination
            className={s.pagnt}
            labelRowsPerPage={'Выводить по'}
            rowsPerPageOptions={[10, 20, 50]}
            component='div'
            count={count}
            page={offset}
            onPageChange={setOffset}
            rowsPerPage={limit}
            onRowsPerPageChange={setLimit}
          />
        }
      </div>
    ) || null;
  }

  render() {
    const {cards, status, isLastLevel} = this.props;

    if (!cards.length && status !== statusEnum.LOADING) {
      return <EmptyBlock />;
    }

    return (
      <div className={s.content}>
        {this.getPagination(true)}
        <div className={s.cards}>
          <Cards items={cards} withPhone={isLastLevel} />
        </div>
        {this.getPagination(false)}
      </div>
    );
  }
}

export default Content;
