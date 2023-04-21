import BestSeller from '../components/BestSeller';
import Categories from '../components/Categories';
import HeroBanner from '../components/HeroBanner';
import Policy from '../components/Policy';
import Testimonial from '../components/Testimonial';

import { client } from '../lib/client';

export default function Home({ banners, products }) {
  return (
    <>
      <HeroBanner banners={banners} />
      <Policy />
      <Categories products={products} />
      <BestSeller products={products} />
      <Testimonial />
    </>
  );
}

export const getServerSideProps = async () => {
  const banneQuery = `*[_type == "banner"]{
    title,
    button,
    "imageUrl": image.asset->url
  }`;
  const banners = await client.fetch(banneQuery);

  const productsQuery = `*[_type == "products"]`;
  const products = await client.fetch(productsQuery);

  return {
    props: { banners, products },
  };
};
