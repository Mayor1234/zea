import Head from 'next/head';
import React from 'react';
import Footer from './Footer';
import NavBar from './NavBar';
import { useAppContext } from '../context/AppContext';

const Layout = ({ title, children }) => {
  const { setHidden } = useAppContext();
  return (
    <>
      <Head>
        <title>
          {title ? title + '-Zuma Express Auto' : 'Zuma Express Auto'}
        </title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <meta name="description" content="Car Auto Sales" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <NavBar />
        </header>

        <main className="m-auto" onClick={() => setHidden(true)}>
          {children}
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Layout;
