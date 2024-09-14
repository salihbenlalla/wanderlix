import { component$ } from "@builder.io/qwik";
import {
  type RequestEventLoader,
  routeLoader$,
  type StaticGenerateHandler,
} from "@builder.io/qwik-city";
import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import PostsGrid from "~/components/PostsGrid";
import AuthorPageHeader from "~/components/PostsGrid/AuthorPageHeader";
import { getAuthorData } from "./getAuthorData";
import GridHeader from "~/components/PostsGrid/GridHeader";
import getAuthorParams from "./getAuthorParams";

/**
 * Loads the author's data and posts from the database.
 */
export const useGetAuthor = routeLoader$(
  async (ev: RequestEventLoader<PlatformCloudflarePages>) =>
    await getAuthorData(ev)
);

/**
 * Renders the author page.
 */
export default component$(() => {
  const authorData = useGetAuthor().value;

  if (authorData.failed) {
    const authorPageTitle = authorData.message;
    return (
      <>
        <div class="sub-header">
          <GridHeader pageTitle={authorPageTitle} />
        </div>
        <div class="page-content"></div>
      </>
    );
  }
  return (
    <>
      <div class="sub-header">
        <AuthorPageHeader {...authorData.author} />
      </div>
      <div class="page-content">
        <PostsGrid
          posts={authorData.posts}
          totalPages={authorData.totalPages}
          currentPage={authorData.currentPage}
        />
      </div>
    </>
  );
});

export const onStaticGenerate: StaticGenerateHandler = async (env) => {
  // eslint-disable-next-line
  const authorNames = await getAuthorParams(env);

  return {
    params: authorNames.map((authorName) => {
      return { authorName };
    }),
  };
};
