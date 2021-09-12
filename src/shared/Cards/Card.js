import React from 'react';
import s from './Cards.module.scss';
import {Card} from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import PhoneIcon from '@material-ui/icons/Phone';
import classNames from 'classnames';
import {inject} from 'mobx-react';
import Callme from '../Callme';
const plural = require('plural-ru');

import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import AddShoppingCartIcon from '@material-ui/icons/ShoppingCart';

@inject(({RouterStore}) => {
  return {RouterStore};
})

class CardView extends React.Component {
  constructor() {
    super();
    this.state = {
      isHover: false
    };
  }

  get colors() {
    const {finishingMaterial} = this.props;

    if (!finishingMaterial) {
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

    routeChange = () => {
      const {alias, id, RouterStore} = this.props;
      const pathname = alias && `/catalog/${alias}` || `/product/${id}`;

      RouterStore.history.push({pathname});
    }

    setHover = (isHover) => {
      this.setState({isHover});
    };

    render() {
      const {isHover} = this.state;
      const {imgForHover, isDoor, img, name, collection, id, price, withPhone} = this.props;

      return (
        <Card className={s.root}>
          <CardActionArea
            className={s.area}
            onMouseEnter={() => this.setHover(true)}
            onMouseLeave={() => this.setHover(false)}
          >
            <CardMedia
              onClick={this.routeChange}
              className={s.media}
            >
              <React.Fragment>
                {
                  imgForHover &&
                  <img className={classNames(s.img, {[s.isDoor]: isDoor}, {[s.isShow]: isHover})} src={imgForHover} />
                }
                <img className={classNames(s.img, {[s.isDoor]: isDoor}, {[s.isShow]: !(imgForHover && isHover)})} src={img} />
              </React.Fragment>
            </CardMedia>
            <CardContent
              onClick={this.routeChange}
              className={s.content}
            >
              {id && <span className={s.id}> код {id} </span> || null}
              {
                collection && (
                  <span className={s.collection}>
                    {collection}
                    {this.colors}
                  </span>
                )
              }
              <span className={s.name}>
                {name}
              </span>
              {
                price && (
                  <span className={s.price}> {price.price} ₽
                    <span className={s.unit}>
                    за 1 м2
                    </span>
                  </span>
                ) || null
              }
            </CardContent>
            {
              withPhone && (
                <CardActions
                  className={s.actions}
                >
                  <Callme
                    isShowButText={isHover}
                    product={{imgForHover, img, name, id, isDoor}}
                    className={s.call}
                    buttonText={'Оставить заявку'}
                    buttonProps={{
                      className: s.call,
                      startIcon: <AddShoppingCartIcon />,
                      color: 'primary',
                      size: 'small',
                      variant: 'text'
                    }}
                  />
                </CardActions>
              ) || null
            }
          </CardActionArea>
        </Card>
      );
    }
}

export default CardView;
