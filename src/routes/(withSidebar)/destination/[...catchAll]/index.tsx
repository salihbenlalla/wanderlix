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
import { getDestinationData } from "./getDestinationData";
import getDestinationParams from "./getDestinationParams";
import { constructDestinationPath } from "~/lib/helpers/constructDestinationPath";
import { getOrigin } from "~/lib/helpers/getOrigin";

export const useDestinationData = routeLoader$(
  async (ev: RequestEventLoader<PlatformCloudflarePages>) => {
    return await getDestinationData(ev);
  },
);

export default component$(() => {
  const destinationData = useDestinationData().value;

  if (destinationData.failed) {
    const destinationPageTitle = destinationData.message;
    return (
      <>
        <div class="sub-header">
          <GridHeader pageTitle={destinationPageTitle} />
        </div>
        <div class="page-content"></div>
      </>
    );
  }

  const destinationPageTitle =
    destinationData.cityName ||
    destinationData.stateName ||
    destinationData.countryName;

  return (
    <>
      <div class="sub-header">
        <GridHeader pageTitle={destinationPageTitle} />
      </div>
      <div class="page-content">
        <PostsGrid
          posts={destinationData.posts}
          totalPages={destinationData.totalPages}
          currentPage={destinationData.currentPage}
        />
      </div>
    </>
  );
});

export const onStaticGenerate: StaticGenerateHandler = async (env) => {
  // eslint-disable-next-line
  const catchAlls = await getDestinationParams(env);

  return {
    params: catchAlls.map((catchAll) => {
      return { catchAll };
    }),
  };
};

export const head: DocumentHead = ({ resolveValue }) => {
  const data = resolveValue(useDestinationData); // Fetch destination data
  const destinationPath = constructDestinationPath(data);

  const destinationName = data.cityName || data.stateName || data.countryName;
  const currentPage = data.currentPage;
  const origin = getOrigin();

  const destinationImage = data.posts ? data.posts[0].image : "";
  const imageWidth = data.posts ? data.posts[0].imageWidth : "";
  const imageHeight = data.posts ? data.posts[0].imageHeight : "";

  // Build the canonical URL based on the current page number
  const canonicalUrl =
    currentPage && currentPage > 1
      ? `${origin}/destination/${destinationPath}/${currentPage}/`
      : `${origin}/destination/${destinationPath}/`;

  return {
    title: `Explore ${destinationName}`,
    links: [
      {
        rel: "canonical",
        href: canonicalUrl,
      },
    ],
    scripts: [
      {
        script: `
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "headline": "Explore ${destinationName}",
            "description": "Discover posts about traveling to ${destinationName}.",
            "url": "${canonicalUrl}",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "url": "${canonicalUrl}"
            },
          }
        `,
        props: {
          type: "application/ld+json",
        },
      },
    ],
    meta: [
      {
        name: "description",
        content: `Discover posts about traveling to ${destinationName}.`,
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:title",
        content: `Explore ${destinationName}`,
      },
      {
        property: "og:description",
        content: `Discover exciting travel tips, stories, and posts about ${destinationName}.`,
      },
      {
        property: "og:url",
        content: canonicalUrl,
      },
      {
        property: "og:image",
        content: `${origin}/images/${imageWidth}/${imageHeight}/${destinationImage}`,
      },
      {
        property: "og:image:width",
        content: `${imageWidth}`,
      },
      {
        property: "og:image:height",
        content: `${imageHeight}`,
      },
      {
        property: "og:image:type",
        content: "image/webp",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: `Explore ${destinationName}`,
      },
      {
        name: "twitter:description",
        content: `Discover exciting travel tips, stories, and posts about ${destinationName}.`,
      },
      {
        name: "twitter:image",
        content: `${origin}/images/${imageWidth}/${imageHeight}/${destinationImage}`,
      },
    ],
  };
};
