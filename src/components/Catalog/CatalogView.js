import React from 'react';
import s from './Catalog.module.scss';
import Filter from './Filter';
import Content from './Content';
import Hierarchy from 'shared/Hierarchy';
import {inject} from 'mobx-react';
import Loader from 'shared/Loader';
import {status as statusEnum} from '../../enums';

@inject(({CatalogStore}) => {
  return {
    hierarchy: CatalogStore.hierarchy || [],
    status: CatalogStore.status
  };
})
class Catalog extends React.Component {
  render() {
    const {hierarchy, status} = this.props;

    return (
      <React.Fragment>
        {
          status === statusEnum.LOADING && <Loader /> || null
        }
        <Hierarchy hierarchy={hierarchy} />
        <div className={s.header}>
          {hierarchy.length && hierarchy[hierarchy.length - 1].name || 'Каталог'}
          <div className={s.line} />
        </div>
        <div className={s.content}>
          <Filter />
          <Content />
        </div>
      </React.Fragment>
    );
  }
}

export default Catalog;
