import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://hermano-padawan.github.io",
  base: "/miweb",
  output: "static",
  integrations: [sitemap()],
});
