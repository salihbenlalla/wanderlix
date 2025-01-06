import { component$ } from "@builder.io/qwik";
import {
  type RequestEventLoader,
  routeLoader$,
  type DocumentHead,
} from "@builder.io/qwik-city";
import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import PostsGrid from "~/components/PostsGrid";
import GridHeader from "~/components/PostsGrid/GridHeader";
import { getSearchData } from "./getSearchData";
import { getOrigin } from "~/lib/helpers/getOrigin";

export const useGetSearchData = routeLoader$(
  async (ev: RequestEventLoader<PlatformCloudflarePages>) => {
    const searchPosts = await getSearchData(ev);

    return searchPosts;
  },
);

export default component$(() => {
  const searchData = useGetSearchData().value;

  if (searchData.failed) {
    return (
      <>
        <div class="sub-header">
          <GridHeader pageTitle={searchData.message} />
        </div>
        <div class="page-content"></div>
      </>
    );
  }

  if (searchData.posts.length === 0) {
    return (
      <>
        <div class="sub-header">
          <GridHeader
            pageTitle={`No results for "${searchData.searchQuery}"`}
          />
        </div>
        <div class="page-content"></div>
      </>
    );
  }

  return (
    <>
      <div class="sub-header">
        <GridHeader
          pageTitle={`Search results for: ${searchData.searchQuery}`}
        />
      </div>
      <div class="page-content">
        <PostsGrid
          posts={searchData.posts}
          totalPages={searchData.totalPages}
          currentPage={searchData.currentPage}
          format="list"
        />
      </div>
    </>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const data = resolveValue(useGetSearchData);
  const searchQuery = data.searchQuery;
  const origin = getOrigin();

  let title = "Search";
  let description = "Search for travel posts and destinations.";
  let ogUrl = `${origin}/search/`;

  if (data.failed) {
    title = searchQuery ? "Search error" : "No search query";
    description = searchQuery
      ? "An error occurred during the search. Please try again later."
      : "No search query was entered. Please enter a query to search.";
  } else if (data.posts.length === 0) {
    title = `No results for "${searchQuery}"`;
    description = `No results were found for "${searchQuery}". Try another search.`;
    ogUrl = `${origin}/search/${searchQuery}/`;
  } else {
    // Successful search
    const currentPage = data.currentPage;
    title = `Search results for "${searchQuery}"`;
    description = `Explore posts and travel stories related to "${searchQuery}".`;
    ogUrl =
      currentPage && currentPage > 1
        ? `${origin}/search/${searchQuery}/${currentPage}/`
        : `${origin}/search/${searchQuery}/`;
  }

  return {
    title,
    links: [{ rel: "canonical", href: ogUrl }],
    scripts: [
      {
        script: `
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "headline": "${title}",
            "description": "${description}",
            "url": "${ogUrl}",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "url": "${ogUrl}"
            },
          }
        `,
        props: {
          type: "application/ld+json",
        },
      },
    ],
    meta: [
      { name: "description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: ogUrl },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "robots", content: "noindex, nofollow" }, // noindex for all search pages
    ],
  };
};
