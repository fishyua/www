import { Client } from "@notionhq/client";
import { createAsync, useParams, useNavigate } from "@solidjs/router";
import { createEffect } from "solid-js";
import { NotionToMarkdown } from "notion-to-md";
import { marked } from "marked";
import { findPostFromStore } from "~/lib/stores";
import { getPostBySlug } from "~/lib/notion";
import SEO from "~/lib/seo";

import "github-markdown-css/github-markdown-light.css";
import { Post } from "~/lib/types";

const getPostContent = async (slug: string | null, post: Post | null) => {
  "use server";
  const notion = new Client({ auth: process.env.NOTION_KEY });

  if (!post) {
    const response = await getPostBySlug(slug!);
    if (!response) return null;
    post = response[0];
  }

  const n2m = new NotionToMarkdown({ notionClient: notion });
  const md = n2m.toMarkdownString(await n2m.pageToMarkdown(post.id));
  const rendered = await marked(md.parent);

  return {
    title: post.title,
    date_edit: post.date_edit,
    content: rendered,
  };
};

export default function Blog() {
  const slug = useParams().slug;
  const post = createAsync(() => getPostContent(slug, findPostFromStore(slug)));

  const nav = useNavigate();

  createEffect(() => {
    if (post() === null) nav("/404");
  });

  return (
    <SEO title="post title placeholder" description="the post">
      <main>
        <div class="post-container">
          <article class="markdown-body" innerHTML={post()?.content} />
        </div>
      </main>
    </SEO>
  );
}
