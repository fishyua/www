import { A, createAsync } from "@solidjs/router";
import { createEffect, For } from "solid-js";

import { postStore, setPostStore } from "~/lib/stores";
import { getPosts } from "~/lib/notion";
import SEO from "~/lib/seo";

export default function BlogList() {
  if (!postStore.loaded) {
    const posts = createAsync(() => getPosts());
    createEffect(() => {
      if (!posts()) return;
      setPostStore({ posts: posts()!, loaded: true });
    });
  }

  return (
    <SEO title="posts" description="hi. i have a blog">
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
    </SEO>
  );
}
