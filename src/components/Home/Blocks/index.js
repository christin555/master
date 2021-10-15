import React from 'react';
import s from './Blocks.module.scss';
import Catalog from './Catalog';
import Chars from './Chars';
import Footer from './Footer';

const Blocks = () => (
  <div className={s.homeBlocks}>
    <Catalog />
    <Chars />
    <Footer />
  </div>
);

export default Blocks;
