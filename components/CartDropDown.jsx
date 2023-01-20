import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { urlFor } from '../lib/client';
import cartIcon from '../public/cart.png';
import deleteIcon from '../public/deleteicon.png';

function CartDropDown() {
  const router = useRouter();
  const {
    cartItems,
    toggleCart,
    totalPrice,
    setHidden,
    totalQuantity,
    changeCartQutantity,
    removeCartProduct,
  } = useAppContext();

  const checkout = () => {
    router.push('login?redirect=/payment');
    setHidden(true);
  };

  return (
    <div>
      <div className="right-4 lg:w-64 lg:right-16 h-auto absolute bg-white border top-16 mt-1 z-10 rounded-b shadow-md">
        <div className="h-auto flex mb-2 flex-col bg-white mx-2">
          {cartItems.length < 1 ? (
            <div className="h-full mt-10 flex flex-col justify-center items-center">
              <div className="flex flex-col justify-center items-center">
                <Image src={cartIcon} alt="cart icon" width={50} height={50} />
                <h2>Cart Is currently empty</h2>
              </div>
              <Link href="/">
                <button
                  className="w-full mt-8 mb-10 px-8 py-2 border-0  bg-gray-700 text-white  rounded-sm"
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
                    <div
                      key={item._id}
                      className="w-full my-8 flex gap-2 border-b pb-8"
                    >
                      <div className="w-2/4">
                        <img
                          src={urlFor(item?.image[0])}
                          alt="cart image"
                          className="rounded-sm h-16"
                        />
                      </div>
                      <div className="w-full flex flex-col ">
                        <span className="text-sm px-1 text-gray-500">
                          {item.name}
                        </span>
                        <span className="text-sm px-1 text-gray-700">
                          &#8358;{item.price}m
                        </span>
                        <div className="mx-1">
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
                          className=" text-lg h-full flex items-center cursor-pointer"
                          onClick={() => removeCartProduct(item, item._id)}
                        >
                          <Image
                            src={deleteIcon}
                            alt="delete icon"
                            width={25}
                            height={25}
                          />
                        </p>
                      </div>
                    </div>
                  ))}
                <div className="flex justify-between pb-2">
                  <span>Subtotal: ({totalQuantity} items)</span>
                  <p>&#8358;{totalPrice}m</p>
                </div>
                <button
                  className="w-full mt-auto mx-auto px-8 py-2 outline-none border-0 bg-gray-700 text-white rounded"
                  onClick={checkout}
                >
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
