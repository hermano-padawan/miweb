import { getCollection } from "astro:content";
import { slugify } from "./slug";

export async function getSermones() {
  return (await getCollection("sermones")).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}

export async function getDevocionales() {
  return (await getCollection("devocionales")).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}

export async function getVersiculos() {
  return (await getCollection("versiculos")).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}

export async function getPersonajesBiblicos() {
  return (await getCollection("personajesBiblicos")).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}

export async function getPreguntasBiblicas() {
  return (await getCollection("preguntasBiblicas")).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}

export async function getDiccionarioBiblico() {
  return (await getCollection("diccionarioBiblico")).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}

export async function getOraciones() {
  return (await getCollection("oraciones")).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}

export async function getAllArticles() {
  const sermones = (await getCollection("sermones")).map((a) => ({
    ...a,
    tipo: "sermones",
  }));

  const devocionales = (await getCollection("devocionales")).map((a) => ({
    ...a,
    tipo: "devocionales",
  }));

  const versiculos = (await getCollection("versiculos")).map((a) => ({
    ...a,
    tipo: "versiculos",
  }));

  const personajesBiblicos = (
    await getCollection("personajesBiblicos")
  ).map((a) => ({
    ...a,
    tipo: "personajes-biblicos",
  }));

  const preguntasBiblicas = (
    await getCollection("preguntasBiblicas")
  ).map((a) => ({
    ...a,
    tipo: "preguntas-biblicas",
  }));

  const diccionarioBiblico = (
    await getCollection("diccionarioBiblico")
  ).map((a) => ({
    ...a,
    tipo: "diccionario-biblico",
  }));

  const oraciones = (await getCollection("oraciones")).map((a) => ({
    ...a,
    tipo: "oraciones",
  }));

  return [
    ...sermones,
    ...devocionales,
    ...versiculos,
    ...personajesBiblicos,
    ...preguntasBiblicas,
    ...diccionarioBiblico,
    ...oraciones,
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