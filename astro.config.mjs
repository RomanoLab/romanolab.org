// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://romanolab.org',
  integrations: [sitemap(), mdx()],
  output: 'static',

  vite: {
    plugins: [tailwindcss()]
  }
});