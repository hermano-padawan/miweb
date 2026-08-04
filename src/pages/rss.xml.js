import rss from "@astrojs/rss";
import { getAllArticles } from "../utils/content";

export async function GET(context) {
  const articles = await getAllArticles();

  return rss({
    title: "Portal Cristiano",
    description: "Últimos sermones y devocionales del Portal Cristiano.",
    site: context.site,

    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.pubDate,
      link: `/${article.tipo}/${article.id}`,
    })),
  });
}