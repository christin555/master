import React from 'react';
import s from './Blocks.module.scss';
import Catalog from './Catalog';
import Chars from './Chars';
import Footer from './Footer';
import Blog from './Blog';
import About from './About';

const Blocks = () => (
  <div className={s.homeBlocks}>
    <Catalog />
    <Chars />
    <About />
    <Blog />
    <Footer />
  </div>
);

export default Blocks;
