// import Image from 'next/image';
import React from 'react';
import Slider from './Slider';

const HeroBanner = ({ banners }) => {
  return (
    <div className=" w-full h-1/4 relative lg:w-full">
      <Slider slides={banners} />
    </div>
  );
};

export default HeroBanner;
