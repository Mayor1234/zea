import React, { useEffect, useState } from 'react';
import { urlFor } from '../lib/client';

function Slider({ slides }) {
  const [current, setCurrent] = useState(0);

  const next = () => {
    const lastSlide = current === slides.length - 1;
    const activeSlide = lastSlide ? 0 : current + 1;
    setCurrent(activeSlide);
  };

  const prev = () => {
    const firstSlide = current === 0;
    const activeSlide = firstSlide ? slides.length - 1 : current - 1;
    setCurrent(activeSlide);
  };

  useEffect(() => {
    const next = (current + 1) % slides.length;
    const timeout = setTimeout(() => {
      setCurrent(next);
    }, 4000);

    return () => {
      clearTimeout(timeout);
    };
  }, [current, slides.length]);

  return (
    <div className="w-full h-1/2 relative">
      <div className="relative">
        <img
          src={urlFor(slides[current].imageUrl)}
          alt="hero banner"
          className="w-full h-1/2 "
        />
        <div className="absolute top-40 flex flex-col w-full justify-center items-center">
          <h1 className="tracking-tight text-slate-200 text-5xl capitalize">
            {slides[current].title}
          </h1>
          <button className="hero-btn capitalize">
            {slides[current].button}
          </button>
        </div>
      </div>
      <div className="top-1/2 inset-x-8 flex justify-between absolute text-red-200 text-2xl cursor-pointer ">
        <div
          onClick={prev}
          className="px-4 text-3xl py-1  hover:bg-gray-800 hover:text-white"
        >
          &#10092;
        </div>
        <div
          onClick={next}
          className="px-4 text-3xl py-1 hover:bg-gray-800 hover:text-white"
        >
          &#10093;
        </div>
      </div>
    </div>
  );
}

export default Slider;
