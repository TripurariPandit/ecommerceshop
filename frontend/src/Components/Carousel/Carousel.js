import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import './Carousel.css';
import carousel1 from '../Assets/carousel1.jpeg'
import carousel2 from '../Assets/carousel2.jpg'
import carousel3 from '../Assets/carousel3.jpg'
import carousel4 from '../Assets/carousel4.jpg'
const MyCarousel = () => {
  return (
    <div className='carousel-container'>
      <Carousel className="custom-carousel" autoPlay={true} infiniteLoop={true} showThumbs={false}>
        <div>
          <img src={carousel1} alt="Slide 1" />
        </div>
        <div>
          <img src={carousel2} alt="Slide 2" />
        </div>
        <div>
          <img src={carousel3} alt="Slide 3" />
        </div>
        <div>
          <img src={carousel4} alt="Slide 3" />
        </div>
      </Carousel>
    </div>
  );
};

export default MyCarousel;
