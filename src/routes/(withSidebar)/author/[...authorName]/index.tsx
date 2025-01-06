import { component$ } from "@builder.io/qwik";
import {
  type RequestEventLoader,
  routeLoader$,
  type DocumentHead,
  type StaticGenerateHandler,
} from "@builder.io/qwik-city";
import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import PostsGrid from "~/components/PostsGrid";
import AuthorPageHeader from "~/components/PostsGrid/AuthorPageHeader";
import { getAuthorData } from "./getAuthorData";
import GridHeader from "~/components/PostsGrid/GridHeader";
import truncateParagraph from "~/lib/helpers/truncateParagraph";
import { getOrigin } from "~/lib/helpers/getOrigin";
import getAuthorParams from "./getAuthorParams";

/**
 * loads the author's data and posts from the database.
 */
export const useGetAuthor = routeLoader$(
  async (ev: RequestEventLoader<PlatformCloudflarePages>) =>
    await getAuthorData(ev),
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

export const head: DocumentHead = ({ resolveValue }) => {
  const data = resolveValue(useGetAuthor);
  const authorData = data.author;
  const currentPage = data.currentPage;
  const origin = getOrigin();

  // Build the canonical URL based on the current page number
  const canonicalUrl =
    currentPage && currentPage > 1
      ? `${origin}/author/${authorData?.url}/${currentPage}/`
      : `${origin}/author/${authorData?.url}/`;

  if (!authorData) {
    return {};
  }

  return {
    title: `Author: ${authorData.name}`,
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
            "headline": "Author: ${authorData.name}",
            "description": "${truncateParagraph(authorData.bio)}",
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
        content: truncateParagraph(authorData.bio),
      },
      {
        property: "og:type",
        content: "profile",
      },
      {
        property: "og:title",
        content: `Author: ${authorData.name}`,
      },
      {
        property: "og:description",
        content: truncateParagraph(authorData.bio),
      },
      {
        property: "og:url",
        content: canonicalUrl,
      },
      {
        property: "og:image",
        content: `${origin}${authorData.imageUrl}`,
      },
      {
        property: "og:image:width",
        content: "1280",
      },
      {
        property: "og:image:height",
        content: "1280",
      },
      {
        property: "og:image:type",
        content: "image/webp",
      },
      {
        name: "author",
        content: authorData.name,
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: `Author: ${authorData.name}`,
      },
      {
        name: "twitter:description",
        content: truncateParagraph(authorData.bio),
      },
      {
        name: "twitter:image",
        content: authorData.imageUrl,
      },
    ],
  };
};

export const onStaticGenerate: StaticGenerateHandler = async (env) => {
  // eslint-disable-next-line
  const authorNames = await getAuthorParams(env);

  return {
    params: authorNames.map((authorName) => {
      return { authorName };
    }),
  };
};
