import React from 'react';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Chip from '@material-ui/core/Chip';
import Icons from 'shared/Icons';
import {inject} from 'mobx-react';
import Hierarchy from '../../shared/Hierarchy';
import Nophoto from 'shared/img/nophoto.png';
import Carousel from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import {Divider} from '@material-ui/core';
import classNames from 'classnames';
import s from './Product.module.scss';
import Callme from '../../shared/Callme';
import {toJS} from 'mobx';
import {Helmet} from 'react-helmet';

@inject(({ProductStore}) => {
  return {
    values: toJS(ProductStore.values || {}),
    fields: ProductStore.fields || [],
    hierarchy: ProductStore.hierarchy || []
  };
})
class Product extends React.Component {

  get mainFields() {
    const {values, fields} = this.props;
    const rows = [];

    fields.filter(({type}) => type === 'isMain').forEach(({title, name}) => {
      if (values[name]) {
        rows.push(
          <div className={s.row}>
            <div>
              <span>{title}</span> <span> {values[name]}</span>
            </div>
          </div>
        );
      }
    });

    return rows;
  }

  get chipFields() {
    const {values, fields} = this.props;
    const rows = [];

    fields.filter(({type}) => type === 'isChip').forEach(({title, name, icon}) => {
      const Icon = Icons[icon];

      if (values[name]) {
        rows.push(
          <Chip label={`${title} - ${values[name]}`} icon={Icon && <Icon className={s.iconChip} /> || null} />
        );
      }
    });

    return rows;
  }

  get imgs() {
    const {values} = this.props;

    if (!values.imgs) {
      return [{
        original: Nophoto
      }];
      //   <div>
      //     <img src={Nophoto} alt={'nophoto'} />
      //   </div>
      // );

    }

    return values.imgs.map(({src}) => {
      return {
        original: src,
        thumbnail: src,
        thumbnailClass: s.thumbs
      };
    });
  }

  //переделать на array2object по type
  get allFields() {
    const {values, fields} = this.props;
    const rows = [];

    fields.forEach(({title, name}) => {
      if (values[name] && title) {
        rows.push(
          <div className={s.row}>
            <div>
              <span>{title}</span> <span> {values[name]}</span>
            </div>
          </div>
        );
      }
    });

    return rows;
  }

  get finishingMaterial() {
    const {fields} = this.props;
    const finishingMaterial = fields.find(({name}) => name === 'finishingMaterial');

    if (!finishingMaterial) {
      return null;
    }

    return (
      <div className={s.materials}>
        <span> Материал отделки </span>
        <div className={s.items}> {
          finishingMaterial.values.map(({id, name, img}) => (
            <div key={id}>
              <img alt={name} src={img} />
              <span>{name}</span>
            </div>
          ))
        }
        </div>
      </div>
    );
  }

  render() {
    const {values, hierarchy} = this.props;

    return (
      <React.Fragment>
        <Helmet>
          <title>{`Мастер Пола - ${values.name}`}</title>
          <meta name='description' content={`Тюмень, коллекция ${values.collection} - ${values.name}. ${hierarchy.map(({name}) => name).join(',')}`} />
        </Helmet>
        <Hierarchy hierarchy={hierarchy} />
        <div className={s.content}>
          <div className={classNames(s.card, {[s.door]: !!values.finishingMaterial})}>
            <Carousel
              autoPlay={true}
              items={this.imgs}
              className={s.carousel}
              width={'40vw'}
            />

            <div className={s.product}>
              <span className={s.brand}> Коллекция {values.collection} </span>
              <title className={s.name}>
                {values.name}
                <span className={s.id}> Код {values.id}</span>
              </title>
              <Divider />
              <description className={s.desc}> {values.description} </description>
              {
                values.price && (
                  <div className={s.price}>
                    <span className={s.value}> <MonetizationOnIcon className={s.icon} />  837 ₽</span>
                    <span className={s.unit}>Цена за м2 </span>
                  </div>
                ) || null
              }
              <div className={s.chars}>
                {/*<div className={s.row}>*/}
                {/*  <div>*/}
                {/*    <span>Код товара</span> <span> {values.id}</span>*/}
                {/*  </div>*/}
                {/*</div>*/}
                {this.mainFields}
              </div>
              <div>
                <Callme
                  product={{...values, img: values?.imgs && values.imgs[0]?.src}}
                  className={s.call}
                  buttonText={'Оставить заявку'}
                />
              </div>
              {this.finishingMaterial}
              <div className={s.additional}>
                {this.chipFields}
              </div>
            </div>
          </div>
          <div className={s.titleCharacteristic}> Характеристики товара</div>
          <div className={s.characteristic}>
            {this.allFields}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Product;
