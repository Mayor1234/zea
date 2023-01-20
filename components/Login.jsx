import Link from 'next/link';
import React from 'react';
import { useAppContext } from '../context/AppContext';

function Login() {
  const { user, logoutUser } = useAppContext();
  const handleClick = () => {
    if (user) logoutUser();
  };
  return (
    <div onClick={handleClick}>
      <Link href="/login">{user ? 'Log out' : 'Login'}</Link>
    </div>
  );
}

export default Login;
