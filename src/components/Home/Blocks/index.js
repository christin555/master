import React from 'react';
import s from './Blocks.module.scss';
import Img1 from '../../../shared/img/img1.jpg';
import Img2 from '../../../shared/img/img2.jpg';
import Img3 from '../../../shared/img/img3.jpg';
import Img4 from '../../../shared/img/img4.jpg';
import Img5 from '../../../shared/img/img5.jpg';
import Img6 from '../../../shared/img/img6.jpg';
import Img7 from '../../../shared/img/img7.jpg';
import Img8 from '../../../shared/img/img8.jpg';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Callme from '../../../shared/Callme';
import Cards from '../../../shared/Cards';
import {useHistory} from 'react-router-dom';

const Blocks = () => {
  const items = [
    {
      name: 'Ламинат',
      img: Img7,
      alias: 'laminate'
    },
    {
      name: 'Кварцвинил',
      img: Img8,
      alias: 'quartzvinyl'
    },
    {
      name: 'Двери',
      img: Img2,
      alias: 'doors'
    }
  ];

  const history = useHistory();

  function handleClick() {
    history.push('/catalog');
  }

  return (
    <div className={s.other}>
      <div className={s.blockContact}>
        <div>
          <img src={Img4} />
        </div>
        <div className={s.content}>
          <div className={s.text}>
            {
              `Приобретая напольные покрытия и услуги у нас, Вы забудете что такое «ремонт» на долгие годы!`
            }
            <span>
                        Хочешь узнать более подробную информацию? Тогда жми на кнопку!
            </span>
          </div>
          <Callme textButton={'Оставить заявку'} />
        </div>
        <div>
          <img src={Img5} />
        </div>
        <div>
          <img src={Img6} />
        </div>
      </div>
      <div className={s.why}>
        <h2>
          Почему стоит обратиться
          именно к нам?
        </h2>
        <div className={s.list}>
          <span> <CheckIcon /> Лучший материал и качество </span>
          <span>  <CheckIcon /> Гарантия на монтаж до 3-х лет </span>
          <span>  <CheckIcon /> Исключительно опытные и квалифицированные мастера </span>
          <span>  <CheckIcon /> Все работы выполняются точно в срок </span>
        </div>
      </div>
      <div className={s.catalog}>
        <div className={s.cards}>
          <Cards items={items} withPhone={false} />
        </div>
        <div className={s.content}>
          <div className={s.list}>
            <span className={s.header}>
                       МЫ ПРЕДОСТАВЛЯЕМ
            </span>
            <span>  <LocalOfferIcon className={s.catalogIcon} /> ДВЕРИ </span>
            <span>  <LocalOfferIcon className={s.catalogIcon} /> ЛАМИНАТ </span>
            <span>  <LocalOfferIcon className={s.catalogIcon} /> КВАРЦВИНЛ </span>
            <span>  <LocalOfferIcon className={s.catalogIcon} /> КЕРАМОГРАНИТ </span>
            <span>  <LocalOfferIcon className={s.catalogIcon} /> КОВРОЛИН </span>
            <span>  <LocalOfferIcon className={s.catalogIcon} /> ПРОБКОВЫЕ ПОКРЫТИЯ </span>
            <span>  <LocalOfferIcon className={s.catalogIcon} /> ФИНИШНЫЕ СМЕСИ</span>
            <span>  <LocalOfferIcon className={s.catalogIcon} /> СОПУТСТВУЮЩИЕ ТОВАРЫ</span>
            <span>  <VpnKeyIcon className={s.catalogIcon} /> РЕМОНТ ПОД КЛЮЧ И МОНТАЖ </span>
          </div>
          <Button
            onClick={handleClick}
            variant='outlined'
            className={s.button}
          >
                 НАШ Каталог
          </Button>
        </div>
      </div>
      <div className={s.block}>
        <div className={s.textBlock}>
          <h2>
            Команда, которой можно доверить ремонт
          </h2>
          <div className={s.text}>
            <span>
    «Мастер Пола» работает в г. Тюмень , поставляя ремонтные и строительный материалы, а также
инструменты и оборудование с 2019 года. Неважно, хотите ли вы отремонтировать ваш дом,
построить новый с нуля или вам нужны только небольшие косметические работы, - мы сможем
помочь вам. Мы стараемся обеспечить клиентов понятными мануалами, качественными материалами,
а также всегда готовы оказать профессиональную поддержку в процессе работы. Мы предлагаем
широкий спектр оборудования и аксессуаров, способных удовлетворить все запросы.
            </span>
            <span>
                Наши клиенты и профессиональные строители, и частные лица доверяют нам и полагаются на наши
                товары и услуги. Специалисты, которые работают у нас, обладают высокой профессиональной
                компетенцией и всегда готовы помочь советом и делом. Свяжитесь с нами и узнайте, чем мы
                сможем быть полезными.

                Рассчитайте стоимость монтажа в вашем доме ⠀
            </span>
          </div>
        </div>
        <div className={s.mediaBlock}>
          <img src={Img1} />
        </div>
      </div>
      <div className={s.block}>
        <div className={s.mediaBlock}>
          <img src={Img3} />
        </div>
        <div className={s.textBlock}>
          <h2>
            Товары высокого качества
          </h2>
          <div className={s.text}>
            <span>
В нашем салоне вы можете подобрать для своего помещения напольное покрытие на любой вкус и цвет.
Мы работаем только с самыми лучшими производителями, которые популярны не только в России, но и во всем мире.
С уверенностью гарантируем, что высокое качество нашего товара будет радовать вас долгие годы.
Наши специалисты имеют многолетний опыт в укладке напольных покрытий и профессионально выполнят весь комплекс работ.
Гарантия на выполненные работы до 3 лет.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blocks;
