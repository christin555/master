import React from 'react';
import s from './Content.module.scss';
import Cards from '../../../shared/Cards';
import {inject} from 'mobx-react';
import EmptyBlock from '../../../shared/EmptyBlock';
import {status as statusEnum} from '../../../enums';
import Chips from './Chips';
import {Pagination} from '@material-ui/lab';
import {IconButton} from '@material-ui/core';
import classNames from 'classnames';

const plural = require('plural-ru');

@inject(({CatalogStore}) => {
  return {
    products: CatalogStore.products || [],
    productsAvailable: CatalogStore.productsAvailable,
    count: CatalogStore.count,
    setPage: CatalogStore.setPage,
    setLimit: CatalogStore.setLimit,
    page: CatalogStore.page,
    limit: CatalogStore.limit,
    status: CatalogStore.status,
    isFastFilterEnabled: CatalogStore.isFastFilterEnabled,
    hierarchy: CatalogStore.hierarchy || []
  };
})
class Content extends React.Component {
  get label() {
    const {
      count
    } = this.props;

    const pluralLabel = plural(
      count,
      'товар',
      'товара',
      'товаров'
    );

    return `${count} ${pluralLabel}`;
  }

  get count() {
    const {
      count,
      limit
    } = this.props;

    return Math.ceil(count / limit);
  }

    setPage =(_, count) => {
      const {setPage} = this.props;

      setPage(count);
    }

    get pagination() {
      const {page} = this.props;

      return (
        <Pagination
          showFirstButton={true}
          showLastButton={true}
          size='small'
          className={s.pagnt}
          count={this.count}
          page={page}
          onChange={this.setPage}
          color={'secondary'}
        />
      );
    }

    get limit() {
      const {limit, setLimit} = this.props;

      return [12, 24, 36].map((item) => (
        <IconButton
          onClick={() => setLimit(item)}
          key={item}
          size={'small'}
          className={classNames(s.limitButton, {[s.limitActive]: item === limit})}
        >
          {item}
        </IconButton>
      ));
    }

    render() {
      const {products, status, isLastLevel, productsAvailable} = this.props;

      if (!productsAvailable && status !== statusEnum.LOADING) {
        return <EmptyBlock />;
      }

      if (!productsAvailable) {
        return null;
      }

      return (
        <div className={s.cardsContainer}>
          <div className={s.header}>
            <div className={s.count}>
              {this.label}
            </div>
            <div className={s.limit}>
              {this.limit}
            </div>
          </div>
          <Chips />
          <div className={s.cards}>
            <Cards items={products} withPhone={isLastLevel} />
          </div>
          {this.pagination}
        </div>
      );
    }
}

export default Content;
