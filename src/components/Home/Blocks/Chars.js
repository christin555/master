import React from 'react';
import s from './Blocks.module.scss';
import Russia from '../../../shared/Icons/Russia';
import Present from '../../../shared/Icons/Present';
import House from '../../../shared/Icons/House';
import Square from '../../../shared/Icons/Square';

import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

const blocks = [
  {icon: <House className={s.iconChar} />, text: <span>Уложено более <nobr>80 000 м²</nobr></span>},
  {icon: <Russia className={s.iconChar} />, text: 'Работаем по всей России'},
  {icon: <VerifiedUserIcon className={s.iconChar} />, text: 'Гарантия на выполненные работы'},
  {icon: <Present className={s.iconChar} />, text: 'Ты новосел? У нас для тебя подарок!'}
];
const Blocks = () => (
  <div className={s.charsBlock}>
    {
      blocks.map(({icon, text}) => (
        <div>
          <div className={s.border}> <Square className={s.borderIcon} /></div>
          <div className={s.icontext}>
            <div>{icon} </div>
            <div>{text} </div>
          </div>
        </div>
      ))
    }
  </div>
);

export default Blocks;
