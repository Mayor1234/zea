import Link from 'next/link';
import React from 'react';

const Logo = () => {
  return (
    <div className="w-auto">
      <Link href="/">
        <a className="text-lg font-bold p-4">ZEA</a>
      </Link>
    </div>
  );
};

export default Logo;
