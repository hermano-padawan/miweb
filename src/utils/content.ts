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

export async function getAllArticles() {
  const sermones = (await getCollection("sermones")).map((a) => ({
    ...a,
    tipo: "sermones",
  }));

  const devocionales = (await getCollection("devocionales")).map((a) => ({
    ...a,
    tipo: "devocionales",
  }));

  return [...sermones, ...devocionales].sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}

export async function getCategories() {
  const articles = await getAllArticles();

  return [
    ...new Set(articles.map((a) => a.data.category)),
  ].sort();
}

export async function getTags() {
  const articles = await getAllArticles();

  return [
    ...new Set(
      articles.flatMap((a) => a.data.tags)
    ),
  ].sort();
}

export function getCategorySlug(category: string) {
  return slugify(category);
}

export function getTagSlug(tag: string) {
  return slugify(tag);
}