import Link from 'next/link';
import React from 'react';
import { urlFor } from '../lib/client';

const Products = ({ product }) => {
  const { name, image, slug, model } = product;

  return (
    <div className="card">
      <Link href={`/product/${slug.current}`}>
        <a>
          <img
            src={urlFor(image && image[0])}
            alt={name}
            className="max-w-full rounded shadow block"
          />
        </a>
      </Link>

      <div className="flex flex-col items-center justify-center p-2">
        <Link href={`/product/${slug.current}`}>
          <a>
            <h2 className="text-lg">{model}</h2>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Products;
