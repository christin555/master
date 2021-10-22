import React from 'react';
import s from './Card.module.scss';
import Button from '../Button';
import {Link} from 'react-router-dom';

const Card = ({name, alias, img}) => (
  <div className={s.card}>
    <img src={img} />

    <div className={s.name}>
      <Button
        className={s.but}
        variant={'outlined'}
        component={Link}
        to={`/catalog/${alias}`}
      >
        {name}
      </Button>

    </div>
  </div>
);

export default Card;
