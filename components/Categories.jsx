import React from 'react';
import Products from './Products';

function Categories({ products }) {
  return (
    <div>
      <div className="container mx-auto ">
        <div className="heading-1">
          <h2 className="heading-2">Shop By Categories</h2>
          <span className="heading-3"></span>
        </div>
        <div className="mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product) => (
            <Products key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;
