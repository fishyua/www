import { Client } from "@notionhq/client";
import { createAsync, useParams } from "@solidjs/router";
import { NotionToMarkdown } from "notion-to-md";
import { marked } from "marked";

const getPostContent = async (slug: string) => {
  "use server";
  const notion = new Client({ auth: process.env.NOTION_KEY });
  const databaseId = process.env.NOTION_ID_POSTS!;

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "slug",
      rich_text: {
        equals: slug,
      },
    },
  });
  if (response.results.length === 0) {
    return null;
  }

  const n2m = new NotionToMarkdown({ notionClient: notion });
  const md = n2m.toMarkdownString(
    await n2m.pageToMarkdown(response.results[0].id),
  );
  return marked(md.parent);
};

export default function Blog() {
  const params = useParams();
  const post = createAsync(() => getPostContent(params.slug));

  return (
    <main>
      <article innerHTML={post()!} />
    </main>
  );
}
