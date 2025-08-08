import { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/notion";

export const metadata: Metadata = {
  title: "posts",
  description: "hi. i have a blog",
};

export default async function Posts() {
  const posts = await getPosts();
  return (
    <main className="mx-4">
      {posts.map((post, i) => (
        <Link className="underline" key={i} href={`/posts/${post.slug}`}>
          {post.title}
        </Link>
      ))}
    </main>
  );
}
