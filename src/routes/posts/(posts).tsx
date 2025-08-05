import { Client } from "@notionhq/client";
import { A, createAsync } from "@solidjs/router";
import { For, Suspense } from "solid-js";

interface BlogEntry {
  title: string;
  slug: string;
  date: Date;
  dateEdit: Date;
}

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

  return response.results.map<BlogEntry>((page: any) => ({
    title: page.properties.name.title[0]?.plain_text || "Untitled",
    slug: page.properties.slug.rich_text[0].plain_text,
    date: new Date(page.properties.date[page.properties.date.type]),
    dateEdit: new Date(
      page.properties.date_edit[page.properties.date_edit.type],
    ),
  }));
};

export default function BlogList() {
  const posts = createAsync(() => getPosts());
  return (
    <main>
      <Suspense fallback={<p>Loading...</p>}>
        <For each={posts()}>
          {(post) => (
            <div>
              <A href={`/posts/${post.slug}`}>{post.title}</A>
            </div>
          )}
        </For>
      </Suspense>
    </main>
  );
}
