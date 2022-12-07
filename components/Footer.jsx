import React from 'react';

const year = new Date().getFullYear();

function Footer() {
  return (
    <>
      <div className="flex h-10 items-center justify-center shadow-inner p-4 text-gray-800 bg-white">
        <p> &copy; All right reserved {year}</p>
      </div>
    </>
  );
}

export default Footer;
