import { createStore } from "solid-js/store";
import { Post } from "~/lib/types";

interface PostStoreState {
  posts: Post[];
  loaded: boolean;
}
export const [postStore, setPostStore] = createStore<PostStoreState>({
  posts: [],
  loaded: false,
});
export const findPostFromStore = (slug: string) => {
  return postStore.loaded
    ? postStore.posts.find((post) => post.slug === slug) || null
    : null;
};
