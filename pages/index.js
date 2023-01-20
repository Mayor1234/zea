import BestSeller from '../components/BestSeller';
import Categories from '../components/Categories';
import HeroBanner from '../components/HeroBanner';
import Policy from '../components/Policy';

import { client } from '../lib/client';

export default function Home({ heroBanner, products }) {
  return (
    <>
      <HeroBanner heroBanner={heroBanner} />
      <Policy />
      <Categories products={products} />
      <BestSeller products={products} />
    </>
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
