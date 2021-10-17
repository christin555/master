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
      alias: '/laminate'
    },
    {
      name: 'Керамогранит',
      alias: '/keramogranit'
    },
    {
      name: 'Кварцвиниловая плитка',
      alias: '/quartzvinyl'
    },
    {
      name: 'Двери',
      alias: '/doors'
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
        <span className={s.policy}>
          Политика конфиденциальности
          <br />
           © Мастер Пола, 2021
        </span>
      </div>
    </div>
  );
};

export default Footer;
