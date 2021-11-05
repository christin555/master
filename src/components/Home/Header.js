import React from 'react';
import s from './Home.module.scss';
import Blocks from './Blocks';
import Button from '../../shared/Button';
import {Link} from 'react-router-dom';
import Callme from '../../shared/Callme';
import YouTubeIcon from '@material-ui/icons/YouTube';
import InstagramIcon from '@material-ui/icons/Instagram';

const Header = () => (
  <div className={s.wrapper}>
    <div className={s.shadow} />
    <div className={s.overlay}>
      <div className={s.txtblocks}>
        <h2 className={s.name}>
            РЕАЛИЗУЙТЕ МЕЧТЫ ВМЕСТЕ С НАМИ
        </h2>
        <h2 className={s.slogan}>
            САЛОН НАПОЛЬНЫХ ПОКРЫТИЙ И ДВЕРЕЙ
        </h2>
        <div className={s.subs}>
          <a
            target={'_blank'}
            rel='noopener noreferrer'
            href='https://www.instagram.com/masterpola72'
            title='Перейти на канал в Instagram'
          >
            <InstagramIcon className={s.icon} />
                  instagram
          </a>
          <a
            target={'_blank'}
            rel='noopener noreferrer'
            href='https://www.youtube.com/channel/UC86lrjiQpHt0Fwzr0FoBxyA'
            title='Перейти на канал в Instagram'
          >  <YouTubeIcon className={s.icon} />
                  youtube
          </a>

        </div>
      </div>
    </div>
  </div>

);

export default Header;
