import React from 'react';
import s from './Footer.module.scss';
import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import ViberIcon from '../../shared/Icons/ViberIcon';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import RoomIcon from '@material-ui/icons/Room';
import Callme from '../Callme';
import {Link} from 'react-router-dom';
import DefaultStyle from '../../themes/DefaultStyle';

const Index = () => {

  const items = [
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

  return (
    <DefaultStyle>
      <div className={s.footer}>
        <div className={s.content}>
          <div className={s.menu}>
            {
              items.map(({name, alias}) =>
                <Link to={alias} key={alias}>{name}</Link>)
            }
          </div>
          <div className={s.info}>
            <div>
              <span className={s.header}> САЛОН НАПОЛЬНЫХ ПОКРЫТИЙ И ДВЕРЕЙ </span>
              <span className={s.header}> МАСТЕР ПОЛА </span>
              <span className={s.time}> Часы работы </span>
              <span className={s.time}> Ежедневно: 10:00–19:00 </span>
            </div>
            <a
              target={'_blank'}
              rel='noopener noreferrer'
              className={s.address}
              href={'https://2gis.ru/tyumen/firm/70000001041302673?m=65.569066%2C57.099076%2F16'}
            >
              <RoomIcon className={s.iconContact} /> г. Тюмень, ул. Федюнинского д. 62 к. 1
            </a>
          </div>
          <div className={s.contacts}>
            <a
              target={'_blank'}
              rel='noopener noreferrer'
              href='tel:89829881522'
              itemProp='telephone'
            >
              8 (982) 988-15-22
            </a>
            <p>
              Задать вопрос или оформить покупку
            </p>
            <Callme className={s.button} buttonText={'Заказать звонок'} />
            <div className={s.messangers}>
              <a
                target={'_blank'}
                rel='noopener noreferrer'
                href='https://www.instagram.com/masterpola72'
                title='Перейти на канал в Instagram'
              >
                <InstagramIcon className={s.icon} />
              </a>
              <a
                className={s.messenger}
                target={'_blank'}
                rel='noopener noreferrer'
                href={`https://wa.me/89829881522`}
              >
                <WhatsAppIcon className={s.icon} />
              </a>
              <a
                className={s.messenger}
                target={'_blank'}
                rel='noopener noreferrer'
                href={`viber://chat?number=%289829881522`}
              >
                <ViberIcon className={s.icon} />
              </a>
              <a
                className={s.messenger}
              >
                <MailOutlineIcon className={s.icon} />
              </a>
            </div>
          </div>
        </div>
        <div className={s.copy}>
          <div className={s.divider} />
          <span className={s.underText}>
            © 2021 - МАСТЕР ПОЛА
          </span>
        </div>
      </div>
    </DefaultStyle>
  );
};

export default Index;
