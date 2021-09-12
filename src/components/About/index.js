import React from 'react';
import s from './About.module.scss';
import YouTube from 'react-youtube';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import Img from '../../shared/img/about.jpg';

class About extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className={s.header}>
          <div className={s.title}>
                        О НАС
            <div className={s.line} />
            <div className={s.preview}>
              <div className={s.text}>
                <p>
                                    МАСТЕР ПОЛА – молодая и динамично развивающаяся торгово-монтажная организация,
                                    осуществляющая как продажу так и монтаж напольных покрытий.
                </p>
                <p>
                                    Наша компания давно зарекомендовала себя как ответственный и надежный исполнитель
                                    ремонтно - монтажных работ в сфере напольных покрытий.
                </p>
                <span>
                  <div className={s.chars}>
                    <div>
                      <DoneOutlineIcon className={s.icon} /> Гарантия на выполненные работы до 3-х лет
                    </div>
                    <div> <DoneOutlineIcon className={s.icon} /> Материал премиум класса   </div>
                    <div> <DoneOutlineIcon className={s.icon} /> Наши специалисты работают на рынке ремонтных работ уже более 10 лет   </div>
                    <div> <DoneOutlineIcon className={s.icon} /> Все работы выполняются точно в срок   </div>
                  </div>

                </span>
              </div>
            </div>
          </div>
          <YouTube
            className={s.video}
            videoId={'bAmdyypn8OI'}
            opts={{
              playerVars: {
                rel: 0,
                showinfo: 0,
                'iv_load_policy': 3,
                modestbranding: 1,
                fs: 0,
                loop: 1,

                controls: 0
              }
            }}
          />
        </div>
        <div className={s.content}>
          <div className={s.mediaBlock}>
            <img src={Img} />
          </div>
          <div className={s.text}>
            <h3> Профессионализм </h3>
                        Наши специалисты готовы выполнить работы любой сложности
            <ul>
              <li>Подготовка основания</li>
              <li>Финишное выравнивание основания</li>
              <li>Укладка ламината</li>
              <li> {'Монтаж паркетной доски "плавающим способом" и с приклеиванием'}</li>
              <li> Монтаж ПВХ/LVT/кварцвиниловой плитки</li>
              <li> Монтаж настенной и напольной пробки</li>
              <li> Укладка массивной/инженерной доски</li>
              <li> Укладка керамогранита и керамической плитки</li>
              <li> Устройство спортивных покрытий</li>
              <li> Монтаж коврового покрытия</li>
              <li> Обустройство лестниц ковролином</li>
              <li>Укладка коммерческих напольных покрытий</li>
              <li> Демонтаж/монтаж напольного покрытия/стяжки</li>
              <li> Нанесение декоративной штукатурки</li>
              <li> Изготовление художественных композиций из ковролина, кварцвиниловой плитки и рулонных
                        ПВХ-покрытий
              </li>
            </ul>
            <h3> Ответсвенность </h3>
                        Индивидуальный подход к каждому клиенту.
            <br />Все работы выполняются точно в срок.
            <p>
                        Каждый Клиент для нас очень важен, мы всегда поможем выбрать, купить и сделать демонтаж/монтаж
                    напольных покрытий! Обращаясь к нам Вы останетесь довольны на 100%! Качество работы наших
                    профессионалов всегда на высоте!
            </p>
            <h3> Надежность </h3>
                        Наши специалисты работают на рынке ремонтных работ уже более 10 лет.
            <br />В нашем штате исключительно опытные и квалифицированные мастера.
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default About;
