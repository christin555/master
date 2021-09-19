import React from 'react';
import Carousel from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import s from './Delivery.module.scss';

class Delivery extends React.Component {
  get imgs() {

    return [
      {original: 'https://sun9-10.userapi.com/impg/5HOGf2jMZktBTvxTicdUD6WXHEaH78yr5laDag/Ng6lojeDQZE.jpg?size=750x1333&quality=96&sign=b6c831539fedc183ebd89052949de81b&type=album'},
      {original: 'https://sun9-16.userapi.com/impg/qzfdTTnekaG5JV_KpG-EotyPooebarpW-PI7Eg/rnREiLL7s9w.jpg?size=750x1333&quality=96&sign=b4868e63f86f20dcdf85627d73e8b6d7&type=album'}
    ];

  }

  render() {
    return (
      <React.Fragment>
        <div className={s.header}>
          {'ОПЛАТА И ДОСТАВКА'}
          <div className={s.line} />
        </div>
        <div className={s.content}>
          <Carousel
            autoPlay={true}
            items={this.imgs}
            className={s.carousel}
            width={'50vw'}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Delivery;
