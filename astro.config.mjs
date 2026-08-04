// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://tu-dominio.com",

  integrations: [
    sitemap(),
  ],
});
