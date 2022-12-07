import React from 'react';

function Menu() {
  return (
    <div>
      <div className="flex">
        <ul className="flex space-x-12 text-xl capitalize">
          <li>home</li>
          <li>about</li>
          <li>product</li>
          <li>category</li>
          <li>contact</li>
        </ul>
      </div>
    </div>
  );
}

export default Menu;
