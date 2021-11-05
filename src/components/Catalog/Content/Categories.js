import React from 'react';
import {inject} from 'mobx-react';
import CatalogCard from '../../../shared/CatalogCard';
import {toJS} from 'mobx';
import s from './Content.module.scss';

@inject(({CatalogStore}) => {
  return {
    categories: CatalogStore.categories || []
  };
})
class CategoriesView extends React.Component {
  render() {
    const {categories} = this.props;

    return (
      <div className={s.categories}>
        {
          categories.map(({name, img, alias}, index) => (
            <CatalogCard key={index} name={name} img={img} alias={alias} />
          ))
        }
      </div>
    );
  }
}

export default CategoriesView;
