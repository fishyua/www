import { Client } from "@notionhq/client";
import { createAsync, useParams } from "@solidjs/router";
import { NotionToMarkdown } from "notion-to-md";
import { marked } from "marked";
import { findPostFromStore, postStore } from "~/lib/stores";

const getPostIdBySlug = async (slug: string) => {
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

  return response.results[0].id;
};

const getPostContent = async (slug: string | null, id: string | null) => {
  "use server";
  const notion = new Client({ auth: process.env.NOTION_KEY });

  if (!id) {
    const response = await getPostIdBySlug(slug!);
    if (!response) return null;
    id = response;
  }

  const n2m = new NotionToMarkdown({ notionClient: notion });
  const md = n2m.toMarkdownString(await n2m.pageToMarkdown(id));
  return marked(md.parent);
};

export default function Blog() {
  const slug = useParams().slug;
  const rendered = createAsync(() =>
    getPostContent(slug, findPostFromStore(slug)?.id || null),
  );

  return (
    <main>
      <article innerHTML={rendered()!} />
    </main>
  );
}
