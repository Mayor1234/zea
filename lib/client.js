import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: 'm3dpot6x',
  dataset: 'production',
  apiVersion: '2022-10-14',
  useCdn: true,
  token: process.env.NEXT_PUPLIC_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
