import React from 'react';
import s from '../Home.module.scss';
import Master from '../../../shared/img/master.jpg';
import Warranty from '../../../shared/Icons/Warranty';
import Reliable from '../../../shared/Icons/Reliable';

const About = () => (
  <div className={s.aboutContainer}>
    <h2> Напольные покрытия и двери в Тюмени </h2>
    <div className={s.aboutBock}>
      <div className={s.image}>
        <img src={Master} />
      </div>
      <div className={s.textAbout}>
        <div className={s.divider} />
                В нашем салоне вы можете подобрать для своего помещения напольное покрытие на любой вкус и цвет. С
                уверенностью гарантируем, что высокое качество нашего товара будет радовать вас долгие годы.

        <div className={s.iconsblock}>
          <div>
            <Warranty className={s.iconAbout} />
            <h2> Лучший материал и качество </h2>
            <span className={s.iconText}>
                       Мы работаем только с самыми лучшими производителями, которые популярны не только в России, но и
                        во всем мире

            </span>
          </div>
          <div>
            <Reliable className={s.iconAbout} />
            <h2> Гарантия на монтаж </h2>
            <span className={s.iconText}>         Наши специалисты имеют многолетний опыт в укладке напольных покрытий и профессионально выполнят
                        весь комплекс работ
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default About;
