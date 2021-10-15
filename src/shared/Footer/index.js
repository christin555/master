import React from 'react';
import s from './Footer.module.scss';
import LogoBlock from './LogoBlock';
import Links from './Links';
import DefaultStyle from '../../themes/DefaultStyle';
import Copy from './CopyBlock';
import Contacts from './Contacts';

const Footer = () => (
  <DefaultStyle>
    <div className={s.footer}>
      <div className={s.content}>
        <LogoBlock />
        <Links />
        <Contacts />
      </div>
      <Copy />
    </div>
  </DefaultStyle>
);

export default Footer;
