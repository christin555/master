import React from 'react';
import s from './Home.module.scss';
import Blocks from './Blocks';

const Home = () => (
  <div className={s.contentContainer}>
    <div className={s.wrapper}>
      <div className={s.gradientOverlay}>
        <div className={s.shadow} />
        <div className={s.mediaBlock}>
          <div className={s.text}>
                                РЕАЛИЗУЙТЕ МЕЧТЫ ВМЕСТЕ С НАМИ
            <div className={s.slogan}>
              <span>проффесионализм</span>
              <span>ответственность</span>
              <span>надежность</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Blocks />
  </div>
);

export default Home;
