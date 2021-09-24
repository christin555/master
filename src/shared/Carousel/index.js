import React, {useRef} from 'react';
import CarouselView from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const Carousel = ({images, width, className}) => {
  const carouselRef = useRef(null);
  const keyDownHandler = ({key}) => {
    const node = carouselRef.current;

    if (!node) {
      return;
    }

    switch (key) {
      case 'ArrowRight':
      case 'd':
        node.slideRight();
        break;
      case 'ArrowLeft':
      case 'a':
        node.slideLeft();
        break;
      case 'Enter':
        node.fullScreen();
        break;
      case 'Escape':
        node.exitFullScreen();
        break;
    }

  };

  document.addEventListener('keydown', keyDownHandler);

  return (
    <CarouselView
      className={className}
      ref={carouselRef}
      autoPlay={true}
      items={images}
      width={width}
      slideDuration={600}
      slideInterval={5000}
    />
  );
};

export default Carousel;
