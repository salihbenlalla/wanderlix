import { component$ } from "@builder.io/qwik";
import {
  type RequestEventLoader,
  routeLoader$,
  type StaticGenerateHandler,
} from "@builder.io/qwik-city";
import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import PostsGrid from "~/components/PostsGrid";
import GridHeader from "~/components/PostsGrid/GridHeader";
import { getTagData } from "./getTagData";
import getTagParams from "./getTagParams";

export const useTagData = routeLoader$(
  async (ev: RequestEventLoader<PlatformCloudflarePages>) =>
    await getTagData(ev)
);

export default component$(() => {
  const tagData = useTagData().value;

  if (tagData.failed) {
    return (
      <>
        <div class="sub-header">
          <GridHeader pageTitle={tagData.message} />
        </div>
        <div class="page-content"></div>
      </>
    );
  }

  return (
    <>
      <div class="sub-header">
        <GridHeader pageTitle={tagData.tagName} />
      </div>
      <div class="page-content">
        <PostsGrid
          posts={tagData.posts}
          totalPages={tagData.totalPages}
          currentPage={tagData.currentPage}
        />
      </div>
    </>
  );
});

export const onStaticGenerate: StaticGenerateHandler = async (env) => {
  // eslint-disable-next-line
  const tagNames = await getTagParams(env);

  return {
    params: tagNames.map((tagName) => {
      return { tagName };
    }),
  };
};
