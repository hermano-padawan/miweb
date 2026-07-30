import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const sermones = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/sermones",
  }),
  schema: z.object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
  pubDate: z.coerce.date(),
}),
});

export const collections = {
  sermones,
};