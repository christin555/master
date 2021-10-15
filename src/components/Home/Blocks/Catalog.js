import React, {useState} from 'react';
import s from './Blocks.module.scss';
import laminate from '../../../shared/img/laminate.jpg';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import cls from 'classnames';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Button from '../../../shared/Button';
import {Link} from 'react-router-dom';

const items = [
  {
    name: 'Двери',
    img: laminate,
    alias: 'laminate'
  },
  {
    name: 'Напольные покрытия',
    img: laminate,
    alias: 'quartzvinyl'
  },
  {
    name: 'Ламинат',
    img: laminate,
    alias: 'doors'
  },
  {
    name: 'Линолеум',
    img: laminate,
    alias: '/catalog'
  },
  {
    name: 'Керамогранит',
    img: laminate,
    alias: '/catalog'
  },
  {
    name: 'Пробковое покрытие',
    img: laminate,
    alias: '/catalog'
  },
  {
    name: 'Спортивное покрытие',
    img: laminate,
    alias: '/catalog'
  }
];

const Blocks = () => {

  const [activeImg, setActiveImg] = useState(0);
  const toNextBlock = () => {
    if (activeImg < items.length - 1) {
      setActiveImg(activeImg + 1);
    }
  };

  const toPrevBlock = () => {
    if (activeImg !== 0) {
      setActiveImg(activeImg - 1);
    }
  };

  const blocksMedia = items.map(({img}, index) => (
    <div
      key={index}
      className={cls(s.imgBlock, {[s.activeImg]: index === activeImg})}
    >
      <img src={img} />
    </div>
  ));

  const blocksCatalog = items.map(({name}, index) => (
    <div key={index}>
      {name}
      {index === activeImg && <div className={s.activeCategory} /> || null}
    </div>
  ));

  return (
    <div className={s.catalogBlock}>
      <div className={s.mediaContainer}>
        <div className={s.iconBlock} onClick={toPrevBlock}>
          <div className={s.icon}>
            <ArrowBackIosIcon />
          </div>
        </div>
        <div className={s.mediaBlock}>
          {blocksMedia}
        </div>
        <div className={s.iconBlock} onClick={toNextBlock}>
          <div className={s.icon}>
            <ArrowForwardIosIcon />
          </div>
        </div>
      </div>
      <div className={s.catalogContainer}>
        {blocksCatalog}
        <Button
          className={s.but}
          variant={'outlined'}
          component={Link}
          to='/catalog'
        >
          {'Каталог'}
        </Button>
      </div>
    </div>
  );
};

export default Blocks;
