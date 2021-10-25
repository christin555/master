import React from 'react';
import s from './Blocks.module.scss';
import doors from '../../../shared/img/doors.jpg';
import laminate from '../../../shared/img/laminate.jpg';
import quartzvinyl from '../../../shared/img/quartzvinyl.jpg';
import CatalogCard from '../../../shared/CatalogCard';
import Button from '../../../shared/Button';
import {Link} from 'react-router-dom';

//заменить на получение с бк
const items = [
  {
    name: 'Двери',
    img: 'https://wide-world.ru/image/catalog/news/dverisruchkami.jpg',
    alias: 'doors'
  },
  {
    name: 'Ламинат',
    img: laminate,
    alias: 'laminate'
  },
  {
    name: 'Кварцвинил',
    img: quartzvinyl,
    alias: 'quartzvinyl'
  },
  {
    name: 'Спортивное покрытие',
    img: 'https://www.tarkett.ru/media/img/large/IN_TEE_OMNISPORTS_V65.jpg',
    alias: 'sport'
  },
  {
    name: 'Керамогранит',
    img: 'https://modern05.ru/upload/iblock/c6e/c6e3c78be9b57ea2f7fc411c9c953f33.jpg',
    alias: 'keramogranit'
  }
];

const Blocks = () => {
  const blocksCatalog = items.map(({name, img, alias}, index) => (
    <CatalogCard key={index} name={name} img={img} alias={alias} />
  ));

  return (
    <div className={s.catalogBlock}>
      <div className={s.catalogItems}>
        <div className={s.mainBlock}>
          <span>
            <p>
            В нашем салоне вы можете подобрать для своего помещения напольное покрытие на любой вкус и цвет.
            </p>
            <p>
           С уверенностью гарантируем, что высокое качество нашего товара будет радовать вас долгие годы.
            </p>
          </span>
          <div className={s.buttonContainer}>
            <Button
              className={s.but}
              variant={'outlined'}
              component={Link}
              to='/catalog'
            >
              {'Каталог'}
            </Button>
          </div>

        </div>
        {blocksCatalog}
      </div>
    </div>
  );
};

export default Blocks;
