import React from 'react';
import {inject} from 'mobx-react';
import 'react-image-gallery/styles/css/image-gallery.css';
import {Divider} from '@material-ui/core';
import s from './Articles.module.scss';
import YouTube from 'react-youtube';
import {Helmet} from 'react-helmet';

@inject(({ArticlesStore}) => {
  return {
    articles: ArticlesStore.articles || []
  };
})
class ArticlesView extends React.Component {

    getMedia = ({src, type}) => {
      switch (type) {
        case 'youtube':
          return (
            <div>
              <YouTube
                className={s.iframe}
                videoId={src}
              />
            </div>
          );
        case 'img':
          return (
            <div className={s.imgBlock}>
              <img
                src={src}
              />
            </div>
          );
      }
    }

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
            {articles.map(({src, title, content, id, type}) => (
              <React.Fragment key={id}>
                <div className={s.article}>
                  {this.getMedia({src, title, content, id, type})}
                  <div>
                    <title className={s.title}>
                      {title}
                    </title>
                    <description className={s.articleContent}>
                      {(content || '')
                        .split('\n')
                        .map((item, index) =>
                          <span key={index}>{item.replace(/\\n/g, '')}</span>)}
                    </description>
                  </div>
                </div>
                <Divider className={s.divider} />
              </React.Fragment>
            ))}
          </div>
        </React.Fragment>
      );
    }
}

export default ArticlesView;
