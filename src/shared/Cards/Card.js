import React from 'react';
import s from './Cards.module.scss';
import {Card} from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import cn from 'classnames';
import {inject} from 'mobx-react';
import Buttons from './Buttons';
import {Link} from 'react-router-dom';
import formatPrice from '../../utils/formatPrice';

const plural = require('plural-ru');

@inject(({RouterStore}) => {
  return {RouterStore};
})
class CardView extends React.Component {

  get collectionLabel() {
    const {collection} = this.props;

    if (!collection) {
      return null;
    }

    return <span> {`| ${collection}`} </span>;
  }

  get colors() {
    const {finishingMaterial = []} = this.props;

    if (!finishingMaterial || !finishingMaterial.length) {
      return null;
    }

    const finishingMateriaLabel = plural(
      finishingMaterial.length,
      'оттенок',
      'оттенка',
      'оттенков'
    );

    return ` | ${finishingMaterial.length} ${finishingMateriaLabel}`;
  }

  render() {
    const {
      alias,
      isDoor,
      img,
      imgs = [],
      name,
      brand,
      price
    } = this.props;
    const pathname = `/product/${alias}`;

    return (
      <Card className={s.root}>
        <CardActionArea
          className={s.area}
        >
          <CardMedia
            className={s.media}
          >
            <Link to={pathname}>
              <img
                className={cn(s.img, {[s.isDoor]: isDoor})}
                src={img || imgs && imgs[0]?.src}
              />
            </Link>

            <Buttons {...this.props} />
          </CardMedia>

          <Link to={pathname} className={s.contentContainer}>
            <CardContent
              className={s.content}
            >
              <div className={s.header}>  {
                brand && (
                  <span className={s.brand}>
                    {brand}
                    {this.collectionLabel}
                    {/* {this.colors}*/}
                  </span>
                )
              }
              <span className={s.name}>
                {name}
              </span>
              </div>
              {
                price && (
                  <span className={s.price}> {formatPrice(price)}</span>
                ) || null
              }
            </CardContent>
          </Link>
        </CardActionArea>
      </Card>
    );
  }
}

export default CardView;
