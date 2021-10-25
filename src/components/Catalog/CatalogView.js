import React from 'react';
import s from './Catalog.module.scss';
import Filter from './Filter';
import Content from './Content';
import Hierarchy from 'shared/Hierarchy';
import {inject} from 'mobx-react';
import Loader from 'shared/Loader';
import {status as statusEnum} from '../../enums';
import Title from '../../shared/Title';

@inject(({CatalogStore}) => {
  return {
    hierarchy: CatalogStore.hierarchy || [],
    status: CatalogStore.status,
    fastfilter: CatalogStore.fastfilter
  };
})
class Catalog extends React.Component {
  get headerTitle() {
    const {hierarchy, fastfilter} = this.props;

    if (!hierarchy.length && fastfilter) {
      return `Поиск`;
    }

    return hierarchy.length && hierarchy[hierarchy.length - 1].name || 'Каталог';
  }

  render() {
    const {status} = this.props;

    return (
      <React.Fragment>
        {
          status === statusEnum.LOADING && <Loader /> || null
        }
        <div className={s.header}>
          <Title title={this.headerTitle} />
        </div>
        <div className={s.content}>
          <Content />
        </div>
      </React.Fragment>
    );
  }
}

export default Catalog;
