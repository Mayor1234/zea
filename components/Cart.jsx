import React from 'react';
import CartDropDown from './CartDropDown';
import { useAppContext } from '../context/AppContext';
import Image from 'next/image';
import cartIcon1 from '../public/cart.jpg';

function Cart() {
  const { hidden, toggleCart, totalQuantity } = useAppContext();

  return (
    <div>
      <div className="w-auto relative  cursor-pointer" onClick={toggleCart}>
        <Image src={cartIcon1} alt="cart" width={25} height={20} />
        <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1  cursor-pointer text-xs border-0">
          {totalQuantity}
        </span>
      </div>
      {!hidden && <CartDropDown />}
    </div>
  );
}

export default Cart;
