import React from 'react';
import s from './Content.module.scss';
import {inject} from 'mobx-react';
import Hierarchy from '../../../shared/Hierarchy';
import Categories from './Categories';
import Products from './Products';
import Filter from '../Filter';

@inject(({CatalogStore}) => {
  return {
    hierarchy: CatalogStore.hierarchy || []
  };
})
class Content extends React.Component {

  render() {
    const {hierarchy} = this.props;

    // if (!cards.length && status !== statusEnum.LOADING) {
    //   return <EmptyBlock />;
    // }

    return (
      <div className={s.container}>
        <Hierarchy hierarchy={hierarchy} />
        <Categories />
        <div className={s.content}>
          <Filter />
          <Products />
        </div>
      </div>
    );
  }
}

export default Content;
