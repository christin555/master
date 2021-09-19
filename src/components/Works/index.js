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
          <Helmet>
                <title> {'Услуги'} </title>
                <link rel="canonical" href="https://master-pola.com" />
                <meta 
                name="description" 
                content={`Монтаж ПВХ/LVT/кварцвиниловой плитки, Укладка керамогранита и керамической плитки, Демонтаж/монтаж напольного покрытия/стяжки, ремонт под ключ`} />
            </Helmet>

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
                <ul>
              <li>Подготовка основания</li>
              <li>Финишное выравнивание основания</li>
              <li>Укладка ламината</li>
              <li> {'Монтаж паркетной доски "плавающим способом" и с приклеиванием'}</li>
              <li> Монтаж ПВХ/LVT/кварцвиниловой плитки</li>
              <li> Монтаж настенной и напольной пробки</li>
              <li> Укладка массивной/инженерной доски</li>
              <li> Укладка керамогранита и керамической плитки</li>
              <li> Устройство спортивных покрытий</li>
              <li> Монтаж коврового покрытия</li>
              <li> Обустройство лестниц ковролином</li>
              <li>Укладка коммерческих напольных покрытий</li>
              <li> Демонтаж/монтаж напольного покрытия/стяжки</li>
              <li> Нанесение декоративной штукатурки</li>
              <li> Изготовление художественных композиций из ковролина, кварцвиниловой плитки и рулонных
                        ПВХ-покрытий
              </li>
            </ul>
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
