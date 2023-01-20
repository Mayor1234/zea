import React from 'react';
import Cart from './Cart';
import Login from './Login';
import Logo from './Logo';
import Menu from './Menu';
import Search from './Search';

function NavBar() {
  return (
    <>
      <nav className=" h-16 top-0 flex items-center shadow-md text-gray-700 relative">
        <div className="container mx-auto flex justify-between items-center ">
          <Logo />
          {/* <Menu /> */}
          <Search />
          <div className="flex justify-center items-center mr-4 gap-4">
            <Login />
            <Cart />
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
