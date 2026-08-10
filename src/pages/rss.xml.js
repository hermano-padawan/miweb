import rss from "@astrojs/rss";
import { getAllArticles } from "../utils/content";
import { site } from "../config/site";

export async function GET(context) {
  const articles = await getAllArticles();

  return rss({
    title: site.name,
    description: `Últimos artículos, estudios y recursos de ${site.name}.`,
    site: context.site,

    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.pubDate,
      link: `/${article.tipo}/${article.id}`,
    })),
  });
}
