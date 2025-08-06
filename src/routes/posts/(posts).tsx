import { Client } from "@notionhq/client";
import { A, createAsync } from "@solidjs/router";
import { createEffect, For } from "solid-js";

import { Post } from "~/lib/types";
import { postStore, setPostStore } from "~/lib/stores";

const getPosts = async () => {
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

  return response.results.map<Post>((page: any) => ({
    id: page.id,
    title: page.properties.name.title[0]?.plain_text || "Untitled",
    slug: page.properties.slug.rich_text[0].plain_text,
    date: new Date(page.properties.date[page.properties.date.type]),
    date_edit: new Date(
      page.properties.date_edit[page.properties.date_edit.type],
    ),
  }));
};

export default function BlogList() {
  if (!postStore.loaded) {
    const posts = createAsync(() => getPosts());
    createEffect(() => {
      if (!posts()) return;
      setPostStore({ posts: posts()!, loaded: true });
    });
  }

  return (
    <main>
      {postStore.loaded ? (
        <For each={postStore.posts}>
          {(post) => (
            <div>
              <A href={`/posts/${post.slug}`}>{post.title}</A>
            </div>
          )}
        </For>
      ) : (
        <p>Loading</p>
      )}
    </main>
  );
}
