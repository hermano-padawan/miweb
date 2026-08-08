import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const schema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
  pubDate: z.coerce.date(),
  author: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  featured: z.boolean().default(false),
  readingTime: z.number().optional(),
});

const sermones = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/sermones",
  }),
  schema,
});

const devocionales = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/devocionales",
  }),
  schema,
});

const versiculos = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/versiculos",
  }),
  schema,
});

const personajesBiblicos = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/personajes-biblicos",
  }),
  schema,
});

const preguntasBiblicas = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/preguntas-biblicas",
  }),
  schema,
});

const diccionarioBiblico = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/diccionario-biblico",
  }),
  schema,
});

const oraciones = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/oraciones",
  }),
  schema,
});

const estudiosBiblicos = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/estudios-biblicos",
  }),
  schema,
});

export const collections = {
  sermones,
  devocionales,
  versiculos,
  personajesBiblicos,
  preguntasBiblicas,
  diccionarioBiblico,
  oraciones,
  estudiosBiblicos,
};