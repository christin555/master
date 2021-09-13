import React from 'react';
import Chip from '@material-ui/core/Chip';
import Icons from 'shared/Icons';
import {inject} from 'mobx-react';
import Carousel from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import {Divider} from '@material-ui/core';
import classNames from 'classnames';
import s from './Works.module.scss';
import YouTube from 'react-youtube';
import Nophoto from '../../shared/img/nophoto.png';
import Callme from '../../shared/Callme';

class Works extends React.Component {
  get imgs() {

    return [
      {original: 'http://45.147.179.124:8000/public/works1.jpg', thumbnail: 'http://45.147.179.124:8000/public/works1.jpg'},
      {original: 'http://45.147.179.124:8000/public/works2.jpg', thumbnail: 'http://45.147.179.124:8000/public/works2.jpg'}
    ];

  }

  render() {
    return (
      <React.Fragment>
        <div className={s.header}>
          {'Услуги'}
          <div className={s.line} />
        </div>
        <div className={s.content}>
          <div className={s.preview}>
            <Carousel
              items={this.imgs}
              additionalClass={s.carousel}
            />
            <div className={s.text}>
              <div className={s.title}>
                                Команда, которой можно доверить ремонт
              </div>
              <p>
                    Команда, которой можно доверить ремонт
                    «Мастер Пола» работает в г. Тюмень , поставляя ремонтные и строительный материалы, а
                    также
                    инструменты и оборудование с 2019 года. Неважно, хотите ли вы отремонтировать ваш дом,
                    построить новый с нуля или вам нужны только небольшие косметические работы, - мы сможем
                    помочь вам. Мы стараемся обеспечить клиентов понятными мануалами, качественными
                    материалами,
                    а также всегда готовы оказать профессиональную поддержку в процессе работы.
              </p>
              <p>
                    Мы предлагаем
                    широкий спектр оборудования и аксессуаров, способных удовлетворить все запросы.
                    Наши клиенты и профессиональные строители, и частные лица доверяют нам и полагаются на
                    наши
                    товары и услуги. Специалисты, которые работают у нас, обладают высокой профессиональной
                    компетенцией и всегда готовы помочь советом и делом.
              </p>
              <p> Свяжитесь с нами и узнайте, чем мы сможем быть полезными.
              </p>
                         ⠀
              <Callme buttonText={'Рассчитайте стоимость монтажа в вашем доме'} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Works;
