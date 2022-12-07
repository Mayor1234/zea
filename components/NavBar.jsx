import React from 'react';
import Cart from './Cart';
import Logo from './Logo';
import Menu from './Menu';

function NavBar() {
  return (
    <>
      <nav className=" h-16 top-0 flex items-center shadow-md text-gray-700 relative">
        <div className="container mx-auto flex justify-between items-center">
          <Logo />
          <Menu />
          <Cart />
        </div>
      </nav>
    </>
  );
}

export default NavBar;
