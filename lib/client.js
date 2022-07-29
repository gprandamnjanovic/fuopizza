import sanityClient from '@sanity/client';
import ImageUrlBuilder from '@sanity/image-url';
export const client = sanityClient({
  projectId: '8jnpwpk7',
  dataset: 'production',
  apiVersion: '2022-07-19',
  useCdn: true,
  token: process.env.NEXT_APP_SANITY_TOKEN,
});

const builder = ImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
