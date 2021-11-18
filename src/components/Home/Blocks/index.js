import React from 'react';
import s from './Blocks.module.scss';
import Catalog from './Catalog';
import Chars from './Chars';
import Blog from './Blog';
import About from './About';
import Popular from '../../../shared/Popular';

const Blocks = () => (
  <div className={s.homeBlocks}>
    <Chars />
    <Catalog />
    <Popular />
    <About />
    <Blog />
  </div>
);

export default Blocks;
