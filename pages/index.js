import BestSeller from '../components/BestSeller';
import Categories from '../components/Categories';
import HeroBanner from '../components/HeroBanner';
import Layout from '../components/Layout';

import { client } from '../lib/client';

export default function Home({ heroBanner, products }) {
  return (
    <Layout>
      <HeroBanner heroBanner={heroBanner} />
      <Categories products={products} />
      <BestSeller />
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const banneQuery = '*[_type == "banner"][0]';
  const heroBanner = await client.fetch(banneQuery);

  const productsQuery = `*[_type == "products"]`;
  const products = await client.fetch(productsQuery);

  return {
    props: { heroBanner, products },
  };
};
