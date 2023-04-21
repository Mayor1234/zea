import React from 'react';
import Products from './Products';

function BestSeller({ products }) {
  return (
    <div>
      <div className="container mx-auto mb-8">
        <div className="heading-1">
          <h2 className="heading-2">Best Selling Products</h2>
          <span className="heading-3"></span>
        </div>

        <div className="h-40 relative mx-4 lg:h-80 overflow-x-hidden ">
          <div className="w-full flex justify-center gap-4 track">
            {products.map((item) => (
              <Products key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BestSeller;
