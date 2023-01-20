import '../styles/globals.css';
import { AppContext } from '../context/AppContext';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <AppContext>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext>
  );
}

export default MyApp;
