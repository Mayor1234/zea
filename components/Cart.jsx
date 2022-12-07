import React from 'react';
import CartDropDown from './CartDropDown';
import { useAppContext } from '../context/AppContext';

function Cart() {
  const { hidden, toggleCart, totalQuantity } = useAppContext();

  return (
    <div>
      <div className="w-auto relative cursor-pointer" onClick={toggleCart}>
        <img src="cart.jpg" alt="cart" width={25} height={25} />
        <span className="absolute -top-3 -right-3 bg-red-600 text-white rounded-full px-1.5 py-0.9 cursor-pointer text-sm border-0">
          {totalQuantity}
        </span>
      </div>
      {!hidden && <CartDropDown />}
    </div>
  );
}

export default Cart;
