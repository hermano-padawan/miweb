import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const noindexPaths = new Set(["/aviso-legal/", "/privacidad/", "/cookies/", "/contacto/"]);
const base = process.env.DEPLOY_BASE_PATH || "/";
const basePrefix = base === "/" ? "" : `/${base.replace(/^\/+|\/+$/g, "")}`;

function routePath(page) {
  const pathname = new URL(page).pathname;
  return basePrefix && pathname.startsWith(`${basePrefix}/`)
    ? pathname.slice(basePrefix.length)
    : pathname;
}

export default defineConfig({
  site: "https://nexobiblico.site",
  base,
  output: "static",
  integrations: [
    sitemap({
      filter: (page) => !noindexPaths.has(routePath(page)),
    }),
  ],
});
