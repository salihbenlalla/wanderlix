import { component$ } from "@builder.io/qwik";
import {
  type RequestEventLoader,
  routeLoader$,
  type StaticGenerateHandler,
  type DocumentHead,
} from "@builder.io/qwik-city";
import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import PostsGrid from "~/components/PostsGrid";
import GridHeader from "~/components/PostsGrid/GridHeader";
import { getTagData } from "./getTagData";
import getTagParams from "./getTagParams";
import { getOrigin } from "~/lib/helpers/getOrigin";

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


export const head: DocumentHead = ({ resolveValue, url }) => {
  const data = resolveValue(useTagData); // Assuming you have a hook for fetching tag data
  const tagData = { url: data.tagUrl, name: data.tagName };
  const currentPage = data.currentPage;
  const origin = getOrigin(url);

  // Build the canonical URL based on the current page number
  const canonicalUrl = currentPage && currentPage > 1
    ? `${origin}/tag/${tagData.url}/${currentPage}/`
    : `${origin}/tag/${tagData.url}/`;

  return {
    title: `Tag: ${tagData.name}`,
    links: [
      {
        rel: "canonical",
        href: canonicalUrl,
      },
    ],
    meta: [
      {
        name: "description",
        content: `Explore posts about ${tagData.name}.`,
      },
      {
        property: "og:type",
        content: "website", // "website" is more appropriate for a tag listing page
      },
      {
        property: "og:title",
        content: `Tag: ${tagData.name}`,
      },
      {
        property: "og:description",
        content: `Explore posts related to ${tagData.name}.`,
      },
      {
        property: "og:url",
        content: canonicalUrl,
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: `Tag: ${tagData.name}`,
      },
      {
        name: "twitter:description",
        content: `Explore posts about ${tagData.name}.`,
      }
    ],
  };
};

export const onStaticGenerate: StaticGenerateHandler = async (env) => {
  // eslint-disable-next-line
  const tagNames = await getTagParams(env);

  return {
    params: tagNames.map((tagName) => {
      return { tagName };
    }),
  };
};
