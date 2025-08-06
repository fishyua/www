import { Author, Feed } from "feed";
import { getPosts } from "~/lib/notion";

const author: Author = {
  name: "feiyeur",
};

export const getFeed = async () => {
  const feed = new Feed({
    title: "feiyeur",
    description: "hi. i live here",
    id: `https://${process.env.SITE_DOMAIN}/`,
    link: `https://${process.env.SITE_DOMAIN}/`,
    language: "en",
    author: author,
    copyright: "feiyeur",
  });

  const posts = await getPosts();
  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      date: post.date_edit,
      author: [author],
      id: `https://${process.env.SITE_DOMAIN}/posts/${post.slug}`,
      link: `https://${process.env.SITE_DOMAIN}/posts/${post.slug}`,
    });
  });

  return feed;
};
