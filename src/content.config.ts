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
    author: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    readingTime: z.number().optional(),
  }),
});

const devocionales = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/devocionales",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    pubDate: z.coerce.date(),
    author: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    readingTime: z.number().optional(),
  }),
});

export const collections = {
  sermones,
  devocionales,
};