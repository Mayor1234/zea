import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signInWithGoogle } from '../firebase/firebase';
import { useAppContext } from '../context/AppContext';
import googleLogo from '../public/google.jpg';
import Image from 'next/image';
// import Image from 'next/image';

function LoginPage() {
  const { signInUser, registerUser } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ name, email, password }) => {
    if (name && email && password) registerUser(name, email, password);
  };

  return (
    <div>
      <form
        className="max-auto max-w-screen-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <h1 className="text-3xl text-gray-800 font-semibold">Login</h1>
          <p className="mt-2 text-gray-500">
            Sign in below to access your account{' '}
          </p>
        </div>
        <div className="relative w-96 mt-8">
          <input
            type="name"
            {...register('name', {
              required: 'Please enter your name',
              minLength: {
                value: 3,
                message: '3 charaters minimum',
              },
            })}
            id="name"
            placeholder="Name"
            className="peer w-full mt-1 border-b-2 border-gray-300 px-0 py-2 placeholder:text-transparent focus:border-blue-300 focus:outline-none"
            autoFocus
            autoComplete="NA"
          />
          {errors.name && (
            <span className="text-red-400">{errors.name.message}</span>
          )}
          <label
            htmlFor="name"
            className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
          >
            Name
          </label>
        </div>
        <div className="relative w-96 mt-8">
          <input
            type="email"
            {...register('email', {
              required: 'Please enter email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Please enter a valid email',
              },
            })}
            id="email"
            placeholder="Email"
            className="peer w-full mt-1 border-b-2 border-gray-300 px-0 py-2 placeholder:text-transparent focus:border-blue-300 focus:outline-none"
            autoFocus
          />
          {errors.email && (
            <span className="text-red-400">{errors.email.message}</span>
          )}
          <label
            htmlFor="email"
            className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 
            peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
          >
            Email
          </label>
        </div>
        <div className="relative w-96 mt-8 mb-8">
          <input
            type="password"
            {...register('password', {
              required: 'Please enter password',
              minLength: {
                value: 6,
                message: '6 charaters minimum',
              },
            })}
            id="password"
            placeholder="Passowrd"
            className="peer w-full mt-1 border-b-2 border-gray-300 px-0 py-2 placeholder:text-transparent focus:border-blue-300 focus:outline-none"
            autoFocus
          />
          {errors.password && (
            <span className="text-red-400">{errors.password.message}</span>
          )}
          <label
            htmlFor="password"
            className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
          >
            Password
          </label>
        </div>
        <div className="mb-4">
          <button type="submit" className="btn-pry">
            Login
          </button>
        </div>
        <div className="mb-8">
          <button className="google-btn" onClick={signInWithGoogle}>
            <div className="flex justify-center items-center">
              <Image
                src={googleLogo}
                alt="google logo"
                width={30}
                height={30}
              />
              <div>Sign In with Google</div>
            </div>
          </button>
        </div>
        <div className="mb-4 text-gray-500 text-sm">
          Don&apos;t have an account? &nbsp;
          <Link href="register">
            <a className="text-gray-600 font-semibold hover:text-gray-800 focus:outline-none">
              Sign up
            </a>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
