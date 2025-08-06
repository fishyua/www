import { Client } from "@notionhq/client";
import { createAsync, useParams } from "@solidjs/router";
import { Suspense } from "solid-js";
import { NotionToMarkdown } from "notion-to-md";
import { marked } from "marked";
import { findPostFromStore } from "~/lib/stores";
import { getPostIdBySlug } from "~/lib/notion";

import "github-markdown-css/github-markdown-light.css";

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
      <div class="post-container">
        <Suspense fallback={<p>Loading</p>}>
          <article class="markdown-body" innerHTML={rendered()!} />
        </Suspense>
      </div>
    </main>
  );
}
