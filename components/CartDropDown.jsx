import Link from 'next/link';
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { urlFor } from '../lib/client';

function CartDropDown() {
  const {
    cartItems,
    toggleCart,
    totalPrice,
    changeCartQutantity,
    removeCartProduct,
  } = useAppContext();

  return (
    <div>
      <div className="w-64 right-16 h-auto absolute bg-white border top-16 z-10 rounded-b shadow-md">
        <div className="h-auto flex mb-2 flex-col bg-white mx-2">
          {cartItems.length < 1 ? (
            <div className="h-full mt-10 flex flex-col justify-center items-center">
              <h2>Your Cart Is Empty</h2>
              <Link href="/">
                <button
                  className="w-full mt-10 mb-10 px-8 py-2 border-0  bg-red-500 text-white  rounded-sm"
                  onClick={toggleCart}
                >
                  Continue Shopping
                </button>
              </Link>
            </div>
          ) : (
            <div>
              <div>
                {cartItems.length >= 1 &&
                  cartItems.map((item) => (
                    <div key={item._id} className="w-full my-8 flex gap-2">
                      <div className="w-2/4">
                        <img
                          src={urlFor(item?.image[0])}
                          alt="cart image"
                          className="rounded-sm h-16"
                        />
                      </div>
                      <div className="w-full flex flex-col ">
                        <span className="text-sm px-1">{item.name}</span>
                        <span className="text-sm px-1 text-red-400">
                          &#8358;{item.price}m
                        </span>
                        <div className="select-none mx-1">
                          <div>
                            <span
                              className="px-2 cursor-pointer border  py-0.5 text-sm"
                              onClick={() =>
                                changeCartQutantity(item._id, 'dec', item)
                              }
                            >
                              &#10134;
                            </span>
                            <span className=" px-2 py-0.5 text-sm border">
                              {item.quantity}
                            </span>
                            <span
                              className="px-2 py-0.5 mr-1 cursor-pointer border text-sm"
                              onClick={() =>
                                changeCartQutantity(item._id, 'inc', item)
                              }
                            >
                              &#10133;
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p
                          className="text-red-400 text-lg h-full flex items-center cursor-pointer"
                          onClick={() => removeCartProduct(item._id)}
                        >
                          &#9746;
                        </p>
                      </div>
                    </div>
                  ))}
                <div className="flex justify-between pb-2">
                  <span>Subtotal:</span>
                  <p className="text-red-400">&#8358;{totalPrice}m</p>
                </div>
                <button className="w-full mt-auto mx-auto px-8 py-2 border-0 bg-gray-800 text-white rounded">
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartDropDown;
