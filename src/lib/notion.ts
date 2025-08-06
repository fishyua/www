import { Client } from "@notionhq/client";
import { Post } from "~/lib/types";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

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
  "use server";
  const notion = new Client({ auth: process.env.NOTION_KEY });
  const databaseId = process.env.NOTION_ID_POSTS!;

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "published",
      checkbox: {
        equals: true,
      },
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

  return notionToPage(response);
};
