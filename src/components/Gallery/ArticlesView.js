import React from 'react';
import Chip from '@material-ui/core/Chip';
import Icons from 'shared/Icons';
import {inject} from 'mobx-react';
import Carousel from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import {Divider} from '@material-ui/core';
import classNames from 'classnames';
import s from './Articles.module.scss';
import YouTube from 'react-youtube';

@inject(({ArticlesStore}) => {
  return {
    articles: ArticlesStore.articles || []
  };
})
class ArticlesView extends React.Component {

    getMedia = ({src, title, content, id, type}) => {
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
                    <div className={s.title}>
                      {title}
                    </div>
                    <div className={s.articleContent}>
                      {(content || '')
                        .split('\n')
                        .map((item, index) =>
                          <span key={index}>{item.replace(/\\n/g, '')}</span>)}
                    </div>
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
