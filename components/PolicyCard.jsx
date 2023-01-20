import Image from 'next/image';
import React from 'react';

function PolicyCard({ policy }) {
  const { image, title, content } = policy;
  return (
    <div className=" container py-12">
      <div className="flex justify-center px-12 gap-4 md:flex-none lg:border-r ">
        <Image
          src={image}
          alt="policy icon"
          width={50}
          height={50}
          className="flex"
        />

        <div className="text-gray-700 capitalize">
          <h3 className="mb-2">{title}</h3>
          <p className="text-slate-500 text-sm ">{content}</p>
        </div>
      </div>
    </div>
  );
}

export default PolicyCard;
