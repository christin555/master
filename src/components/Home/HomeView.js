import React from 'react';
import s from './Home.module.scss';
import Blocks from './Blocks';
import Header from './Header';

const Home = () => (
  <div className={s.contentContainer}>
    <Header />
    <Blocks />
  </div>
);

export default Home;
