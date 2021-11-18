import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from '../Cards/Card';
import {inject} from 'mobx-react';
import s from './styles.module.scss';
import Title from '../Title';

@inject(({PopularStore}) => {
  return {
    popularProducts: PopularStore.popularProducts || []
  };
})
class CardsView extends React.Component {
   responsive = {
     desktop: {
       breakpoint: {max: 3000, min: 1024},
       items: 5,
       slidesToSlide: 1 // optional, default to 1.
     },
     tablet: {
       breakpoint: {max: 1024, min: 464},
       items: 3,
       slidesToSlide: 1 // optional, default to 1.
     },
     mobile: {
       breakpoint: {max: 464, min: 0},
       items: 1,
       slidesToSlide: 1 // optional, default to 1.
     }
   };

   render() {
     const {popularProducts} = this.props;

     const Cards = popularProducts.map((item, index) => (
       <Card
         classNamesRoot={s.card}
         withCategory={true}
         withPopularLabel={false}
         withPhone={false}
         key={index}
         {...item}
       />
     ));

     return (
       <div>
         <Title title={'Популярные товары'} className={s.title} />
         <Carousel
           swipeable={true}
           draggable={false}
           showDots={false}
           responsive={this.responsive}
           infinite={true}
           autoPlay={this.props.deviceType !== 'mobile'}
           autoPlaySpeed={2000}
           keyBoardControl={true}
           customTransition='all 1s linear'
           transitionDuration={3000}
           containerClass='carousel-container'
           removeArrowOnDeviceType={['tablet', 'mobile']}
           deviceType={this.props.deviceType}
           itemClass={s.carouselItem}
         >
           {Cards}
         </Carousel>
       </div>
     );
   }
}

export default CardsView;
