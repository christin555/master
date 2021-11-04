import React from 'react';
import s from './Content.module.scss';
import {inject} from 'mobx-react';
import Hierarchy from '../../../shared/Hierarchy';
import Categories from './Categories';
import Products from './Products';
import Filter from '../Filter';
import {status as statusEnum} from '../../../enums';
import {InWork, NoResults} from '../../../shared/InformBlocks';
import classNames from 'classnames';

@inject(({CatalogStore}) => {
  return {
    hierarchy: CatalogStore.hierarchy || [],
    status: CatalogStore.status,
    productsAvailable: CatalogStore.productsAvailable,
    fastfilter: CatalogStore.fastfilter
  };
})
class Content extends React.Component {
  get InformBlock() {
    const {status, productsAvailable, fastfilter} = this.props;

    if (!productsAvailable && status !== statusEnum.LOADING && !fastfilter) {
      return <InWork />;
    }

    if (!productsAvailable && status !== statusEnum.LOADING && fastfilter) {
      return <NoResults label={fastfilter} />;
    }

    return null;
  }

  render() {
    const {hierarchy, fastfilter} = this.props;

    if (fastfilter) {
      return (
        <div className={s.container}>
          {this.InformBlock}
          <div className={classNames(s.content, s.buttomMargin)}>
            <Products />
          </div>
          <Categories />
        </div>
      );
    }

    return (
      <div className={s.container}>
        <Hierarchy hierarchy={hierarchy} />
        <Categories />
        {this.InformBlock}
        <div className={s.content}>
          <Filter />
          <Products />
        </div>
      </div>
    );
  }
}

export default Content;
