import React, { useState } from 'react';
import { client, urlFor } from '../../lib/client';
import { useAppContext } from '../../context/AppContext';

const ProductDetail = ({ product }) => {
  const { image, name, model, price } = product;
  const [index, setIndex] = useState(0);
  const { incQty, decQty, quantity, addToCart } = useAppContext();

  return (
    <div>
      <div className="container flex gap-8 m-8">
        <div className="w-3/5">
          <div className="w-full mb-2">
            <img
              src={urlFor(image && image[index])}
              alt={name}
              className="rounded-sm"
            />
          </div>
          <div>
            {
              <div className="flex w-40 gap-2 cursor-pointer">
                {image?.map((item, index) => (
                  <img
                    src={urlFor(item)}
                    alt={name}
                    key={index}
                    onMouseEnter={() => setIndex(index)}
                    className="rounded-sm"
                  />
                ))}
              </div>
            }
          </div>
        </div>
        <div className="w-2/5 p-x-8">
          <div>
            <div>
              <div className="text-xl text-gray-400">
                <span className="">{model}</span>
              </div>
              <div className="text-3xl text-gray-700  mb-4">
                <h2>{name}</h2>
              </div>
              <div className="text-2xl mb-8 text-red-400">
                <span> &#8358;{price}m</span>
              </div>
            </div>
            <div className="flex mb-8">
              <p className="pr-8 text-lg">Quantity: </p>
              <div className="select-none">
                <span
                  className="px-4 py-2  cursor-pointer border-spacing-2 bg-slate-200 "
                  onClick={decQty}
                >
                  &#10134;
                </span>
                <span className=" px-4 py-2  border-spacing-2 bg-slate-300 ">
                  {quantity}
                </span>
                <span
                  className="px-4 py-2 mr-2 cursor-pointer border-spacing-2 bg-slate-200"
                  onClick={incQty}
                >
                  &#10133;
                </span>
              </div>
            </div>
            <div className=" flex gap-4 mb-4">
              <div>
                <button
                  type="button"
                  className="w-32 border border-red-500 text-red-500 px-4 py-2 rounded-sm scale-100 transition-transform duration-150 ease-in"
                  onClick={() => addToCart(product, quantity)}
                >
                  Add To cart
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="w-32 bg-red-500 text-white px-4 py-2 rounded-sm"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "products"]{
    slug{
        current
    }
    }`;
  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "products" && slug.current == '${slug}'][0]`;
  const product = await client.fetch(query);

  const productsQuery = `*[_type == "products"]`;
  const products = await client.fetch(productsQuery);

  return {
    props: {
      product,
      products,
    },
  };
};

export default ProductDetail;
