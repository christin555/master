import React from 'react';
import s from './EmtyBlock.module.scss';

const EmptyBlock = () => (
  <div className={s.nogoods}>
      К сожалению, эта категория еще не заполнена. Но мы работаем над этим :)
  </div>
);

export default EmptyBlock;
