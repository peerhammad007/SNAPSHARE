import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const config = {
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID || 'xxx',
    dataset: 'production',
    apiVersion: '2023-08-30',
    useCdn: true,
    token: process.env.REACT_APP_SANITY_TOKEN,
}

export const client = createClient(config);

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);