import "server-only";

import { Client } from "@notionhq/client";
import { Post } from "@/lib/types";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionToMarkdown } from "notion-to-md";
import { marked } from "marked";

const notionToPage = (response: QueryDatabaseResponse) =>
  response.results.map<Post>((page: any) => ({
    id: page.id,
    title: page.properties.name.title[0]?.plain_text || "Untitled",
    slug: page.properties.slug.rich_text[0].plain_text,
    date: new Date(page.properties.date[page.properties.date.type]),
    date_edit: new Date(
      page.properties.date_edit[page.properties.date_edit.type],
    ),
  }));

export const getPosts = async () => {
  const notion = new Client({ auth: process.env.NOTION_KEY });
  const databaseId = process.env.NOTION_ID_POSTS!;

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "published",
          checkbox: {
            equals: true,
          },
        },
        {
          property: "hidden",
          checkbox: {
            equals: false,
          },
        },
      ],
    },
    sorts: [
      {
        property: "date",
        direction: "ascending",
      },
    ],
  });

  return notionToPage(response);
};

export const getPostBySlug = async (slug: string) => {
  const notion = new Client({ auth: process.env.NOTION_KEY });
  const databaseId = process.env.NOTION_ID_POSTS!;

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "slug",
          rich_text: {
            equals: slug,
          },
        },
        {
          property: "published",
          checkbox: {
            equals: true,
          },
        },
      ],
    },
  });

  if (response.results.length === 0) {
    return null;
  }

  return notionToPage(response)[0];
};

export const postToMarkdown = async (id: string) => {
  const notion = new Client({ auth: process.env.NOTION_KEY });
  const n2m = new NotionToMarkdown({ notionClient: notion });
  const md = n2m.toMarkdownString(await n2m.pageToMarkdown(id));
  return marked(md.parent);
};
