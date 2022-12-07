// import Image from 'next/image';
import React from 'react';

import Slider from './Slider';

const HeroBanner = ({ heroBanner }) => {
  const { image } = heroBanner;
  return (
    <div className=" w-full h-1/4 relative lg:w-full">
      <Slider slides={image} />
    </div>
  );
};

export default HeroBanner;
