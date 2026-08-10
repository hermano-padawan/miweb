import { getCollection } from "astro:content";
import { slugify } from "./slug";

const published = <T extends { data: { draft?: boolean } }>(entries: T[]) =>
  entries.filter((entry) => !entry.data.draft);

export async function getSermones() {
  return published(await getCollection("sermones")).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}

export async function getDevocionales() {
  return published(await getCollection("devocionales")).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}

export async function getVersiculos() {
  return published(await getCollection("versiculos")).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}

export async function getPersonajesBiblicos() {
  return published(await getCollection("personajesBiblicos")).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}

export async function getPreguntasBiblicas() {
  return published(await getCollection("preguntasBiblicas")).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}

export async function getDiccionarioBiblico() {
  return published(await getCollection("diccionarioBiblico")).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}

export async function getOraciones() {
  return published(await getCollection("oraciones")).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}

export async function getEstudiosBiblicos() {
  return published(await getCollection("estudiosBiblicos")).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}

export async function getAllArticles() {
  const sermones = published(await getCollection("sermones")).map((a) => ({
    ...a,
    tipo: "sermones",
  }));

  const devocionales = published(await getCollection("devocionales")).map((a) => ({
    ...a,
    tipo: "devocionales",
  }));

  const versiculos = published(await getCollection("versiculos")).map((a) => ({
    ...a,
    tipo: "versiculos",
  }));

  const personajesBiblicos = (
    published(await getCollection("personajesBiblicos"))
  ).map((a) => ({
    ...a,
    tipo: "personajes-biblicos",
  }));

  const preguntasBiblicas = (
    published(await getCollection("preguntasBiblicas"))
  ).map((a) => ({
    ...a,
    tipo: "preguntas-biblicas",
  }));

  const diccionarioBiblico = (
    published(await getCollection("diccionarioBiblico"))
  ).map((a) => ({
    ...a,
    tipo: "diccionario-biblico",
  }));

  const oraciones = published(await getCollection("oraciones")).map((a) => ({
    ...a,
    tipo: "oraciones",
  }));

  const estudiosBiblicos = published(await getCollection("estudiosBiblicos")).map((a) => ({
    ...a,
    tipo: "estudios-biblicos",
  }));

  return [
    ...sermones,
    ...devocionales,
    ...versiculos,
    ...personajesBiblicos,
    ...preguntasBiblicas,
    ...diccionarioBiblico,
    ...oraciones,
    ...estudiosBiblicos,
  ].sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export async function getCategories() {
  const articles = await getAllArticles();

  return [...new Set(articles.map((a) => a.data.category))].sort();
}

export async function getTags() {
  const articles = await getAllArticles();

  return [...new Set(articles.flatMap((a) => a.data.tags))].sort();
}

export function getCategorySlug(category: string) {
  return slugify(category);
}

export function getTagSlug(tag: string) {
  return slugify(tag);
}
