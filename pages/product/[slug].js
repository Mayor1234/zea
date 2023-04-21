import React, { useState } from 'react';
import { client, urlFor } from '../../lib/client';
import { useAppContext } from '../../context/AppContext';

const ProductDetail = ({ product }) => {
  const { image, name, model, price } = product;
  const [index, setIndex] = useState(0);
  const { incQty, decQty, quantity, addToCart } = useAppContext();

  return (
    <div className="container my-4">
      <div className="heading-1">
        <h2 className="heading-2">Product Detail</h2>
        <span className="heading-3"></span>
      </div>
      <div className="grid grid-cols-1 w-full lg:grid-cols-12 gap-12 lg:w-4/5 ">
        <div className="mx-4 lg:col-span-8 col-span-1 ">
          <div className="mb-2">
            <img
              src={urlFor(image && image[index])}
              alt={name}
              className="w-full rounded-sm block"
            />
          </div>
          <div>
            {
              <div className="flex w-36 gap-2 cursor-pointer">
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
        <div className="mx-4 lg:col-span-4 col-span-1 ">
          <div className="p-x-8 w-full">
            <div>
              <div className="text-xl text-gray-400">
                <span className="">{model}</span>
              </div>
              <div className="text-3xl text-gray-700  mb-4">
                <h2>{name}</h2>
              </div>
              <div className="text-2xl mb-8 text-gray-500">
                <span> &#8358;{price}m</span>
              </div>
            </div>
            <div className="flex mb-8">
              <div className="pr-16 text-lg text-gray-600">
                <p>Quantity: </p>
              </div>
              <div className="select-none">
                <span
                  className="px-4 py-2 text-sm cursor-pointer border"
                  onClick={decQty}
                >
                  &#10134;
                </span>
                <span className=" px-4 py-2 text-sm border">{quantity}</span>
                <span
                  className="px-4 py-2 mr-2 text-sm cursor-pointer border"
                  onClick={() => incQty(product)}
                >
                  &#10133;
                </span>
              </div>
            </div>
            <div className=" flex gap-4 mb-8">
              <div>
                <button
                  type="button"
                  className="w-32 border border-gray-500 text-gray-700 shadow-md px-4 py-2 rounded-sm scale-100 transition-transform duration-150 ease-in"
                  onClick={() => addToCart(product, quantity)}
                >
                  Add To cart
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="w-32 bg-gray-700 shadow-md text-white px-4 py-2 rounded-sm"
                >
                  Buy Now
                </button>
              </div>
            </div>
            <div className="w-full">
              <span className="text-2xl text-gray-500 mb-8">Description</span>
              <p className="mt-3 text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Commodi in dolorem eaque? Alias sequi consequatur, ipsum
              </p>
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
