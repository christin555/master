import React from 'react';
import s from './Footer.module.scss';
import LogoBlock from './LogoBlock';
import {Link} from 'react-router-dom';
import DefaultStyle from '../../themes/DefaultStyle';
import Copy from './CopyBlock';
import Contacts from './Contacts';

const Footer = () => {
  const itemsMenu = [
    {
      name: 'Каталог',
      alias: '/catalog'
    },
    {
      name: 'Услуги',
      alias: '/works'
    },
    {
      name: 'Оплата и доставка',
      alias: '/delivery'
    },
    {
      name: 'О нас',
      alias: '/about'
    },
    {
      name: 'Блог',
      alias: '/gallery'
    }
  ];

  const itemsCatalog = [
    {
      name: 'Ламинат',
      alias: '/catalog/laminate'
    },
    {
      name: 'Керамогранит',
      alias: '/catalog/keramogranit'
    },
    {
      name: 'Кварцвиниловая плитка',
      alias: '/catalog/quartzvinyl'
    },
    {
      name: 'Спортивное покрытие',
      alias: '/catalog/sport'
    },
    {
      name: 'Двери',
      alias: '/catalog/doors'
    }
  ];

  return (
    <div className={s.links}>
      <div>
        <span className={s.categoryName}> Каталог </span>
        {
          itemsCatalog.map(({name, alias}) =>
            <Link to={alias} key={alias}>{name}</Link>)
        }
      </div>
      <div>
        <span className={s.categoryName}> Меню </span>
        {
          itemsMenu.map(({name, alias}) =>
            <Link to={alias} key={alias}>{name}</Link>)
        }
      </div>
    </div>
  );
};

export default Footer;
