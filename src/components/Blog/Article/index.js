import React from 'react';
import {inject} from 'mobx-react';
import 'react-image-gallery/styles/css/image-gallery.css';
import s from './style.module.scss';
import YouTube from 'react-youtube';
import {
  Card,
  CardActionArea,
  Avatar,
  CardMedia,
  CardActions,
  CardContent,
  IconButton
} from '@material-ui/core';
import {Link} from 'react-router-dom';
import cn from 'classnames';
import Buttons from '../../../shared/Cards/Buttons';
import Chip from '../../../shared/Chip';
import dayjs from 'dayjs';
import classNames from "classnames";

dayjs.locale('ru')

@inject(({ArticlesStore}) => {
  return {
    articles: ArticlesStore.articles || []
  };
})
class ArticlesView extends React.Component {
  get mediaProps() {
    const {media: {src, type}} = this.props;

    switch (type) {
      case 'youtube':
        return {
          component: 'iframe',
          image: `https://www.youtube.com/embed/${src}`
        };
      case 'img':
        return {
          component: 'img',
          image: src
        };
    }

    return {};
  }

  get category() {
    const {type} = this.props;

    switch (type) {
      case 1:
        return <span className={s.categoryLabel}> Полезные статьи</span>;
      case 2:
        return <span className={s.categoryLabel}> Новости</span>;
    }

    return null;
  }

  render() {
    const {title, content, src, type, createdAt} = this.props;

    console.log(title, content, src, type, createdAt);

    return (

      <Card className={s.root} elevation={0}>
        <CardActionArea
          className={s.area}
        >
          <CardMedia
            className={s.media}
            {...this.mediaProps}
          />
          <Link to={'/'} />

          <Buttons {...this.props} />

          <Link to={'/'}>
            <CardContent
              className={s.content}
            >
              <div className={s.header}>
                {this.category}
                <span className={s.date}>
                  {createdAt &&
                dayjs(createdAt).format(
                  'D MMMM'
                )}
                </span>
              </div>
              {title}
            </CardContent>
          </Link>
        </CardActionArea>
      </Card>

    );
  }
}

export default ArticlesView;
