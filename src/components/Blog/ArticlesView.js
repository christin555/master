import React from 'react';
import {inject} from 'mobx-react';
import 'react-image-gallery/styles/css/image-gallery.css';
import Article from './Article';
import s from './Articles.module.scss';
import {Helmet} from 'react-helmet';

@inject(({ArticlesStore}) => {
  return {
    articles: ArticlesStore.articles || []
  };
})
class ArticlesView extends React.Component {
  render() {
    const {articles} = this.props;

    return (
      <React.Fragment>
        <Helmet>
          <title>{`Мастер Пола. Напольные покрытия и двери. Статьи. `}</title>
          <meta name='description' content={`Тюмень, Напольные покрытия, двери, ламинат, паркет, линолеум, смеси. ${articles.map(({title}) => title).join(',')}`} />
        </Helmet>
        <div className={s.header}>
          {'НАШ БЛОГ'}
          <div className={s.line} />
        </div>
        <div className={s.content}>
          {articles.map((article, index) => <Article key={index} {...article} />)}
        </div>
      </React.Fragment>
    );
  }
}

export default ArticlesView;
