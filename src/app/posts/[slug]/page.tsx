import { Metadata } from "next";
import { getPostBySlug, postToMarkdown } from "@/lib/notion";
import { sanitize } from "@/lib/sanitizer";
import type { Post } from "@/lib/types";
import "github-markdown-css/github-markdown.css";

interface Props {
  params: Promise<{ slug: string }>;
}

const getPost = async (slug: string | null, post: Post | null) => {
  if (!post) {
    const response = await getPostBySlug(slug!);
    if (!response) return null;
    post = response;
  }

  return {
    id: post.id,
    title: post.title,
    date_edit: post.date_edit,
  };
};

const getPostContent = async (id: string) => await postToMarkdown(id);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug, null);

  if (!post)
    return {
      title: "post not found",
      description: "¯\\_(ツ)_/¯",
    };

  return {
    title: post.title,
    description: "the post",
  };
}

export default async function PostView({ params }: Props) {
  const { slug } = await params;

  const post = await getPost(slug, null);
  if (!post) return <p>post not found</p>;

  const rendered = sanitize(await getPostContent(post.id));
  return (
    <main className="max-w-4xl left-0 right-0 m-auto px-4 py-10">
      <h1 className="text-4xl font-semibold mb-8" aria-hidden="true">
        {post.title}
      </h1>
      <article
        className="markdown-body bg-inherit!"
        dangerouslySetInnerHTML={{ __html: rendered }}
      />
    </main>
  );
}
