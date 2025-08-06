import { getFeed } from "~/lib/feed";

export async function GET() {
  const feed = await getFeed();
  return new Response(feed.rss2(), {
    headers: {
      // https://www.rssboard.org/rss-mime-type-application.txt
      "Content-Type": "application/rss+xml",
    },
  });
}
