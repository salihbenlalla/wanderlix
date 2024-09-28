import { component$ } from "@builder.io/qwik";
import { type RequestEventLoader, routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import PostsGrid from "~/components/PostsGrid";
import GridHeader from "~/components/PostsGrid/GridHeader";
import { getSearchData } from "./getSearchData";
import { getOrigin } from "~/lib/helpers/getOrigin";

export const useGetSearchData = routeLoader$(
  async (ev: RequestEventLoader<PlatformCloudflarePages>) => {
    const searchPosts = await getSearchData(ev);

    return searchPosts;
  }
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
          <GridHeader pageTitle={`No results for "${searchData.searchQuery}"`} />
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


export const head: DocumentHead = ({ resolveValue, url }) => {
  const data = resolveValue(useGetSearchData);
  const searchQuery = data.searchQuery;
  const noSearchResults = !data.posts || data.posts.length === 0;
  const currentPage = data.currentPage;
  const origin = getOrigin(url);

  // Handle various failure cases with `data.failed`
  if (data.failed) {
    if (!searchQuery) {
      // Case 1: No search query entered
      return {
        title: "No search query",
        meta: [
          {
            name: "description",
            content: "No search query was entered. Please enter a query to search for",
          },
          {
            property: "og:title",
            content: "No search query",
          },
          {
            property: "og:description",
            content: "No search query was entered. Please enter a query to search for",
          },
          {
            property: "og:url",
            content: `${origin}/search/`,
          },
        ],
      };
    } else {
      // Case 3: Error occurred during search
      return {
        title: "Search error",
        meta: [
          {
            name: "description",
            content: "An error occurred during the search. Please try again later.",
          },
          {
            property: "og:title",
            content: "Search error",
          },
          {
            property: "og:description",
            content: "An error occurred during the search. Please try again later.",
          },
          {
            property: "og:url",
            content: `${origin}/search/`,
          },
        ],
      };
    }
  }

  if (noSearchResults) {
    // Case 2: No results found for the search query
    return {
      title: `No results for "${searchQuery}"`,
      meta: [
        {
          name: "description",
          content: `No results were found for the query "${searchQuery}". Try another search.`,
        },
        {
          property: "og:title",
          content: `No results for "${searchQuery}"`,
        },
        {
          property: "og:description",
          content: `No results were found for the query "${searchQuery}". Try another search.`,
        },
        {
          property: "og:url",
          content: `${origin}/search/${searchQuery}/`,
        },
      ],
    };
  }

  // Case 4: Successful search with results
  const canonicalUrl = currentPage && currentPage > 1
    ? `${origin}/search/${searchQuery}/${currentPage}/`
    : `${origin}/search/${searchQuery}/`;

  return {
    title: `Search results for "${searchQuery}"`,
    links: [
      {
        rel: "canonical",
        href: canonicalUrl,
      },
    ],
    meta: [
      {
        name: "description",
        content: `Search results for "${searchQuery}". Explore relevant posts and travel information.`,
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:title",
        content: `Search results for "${searchQuery}"`,
      },
      {
        property: "og:description",
        content: `Explore posts and travel stories related to "${searchQuery}".`,
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
        content: `Search results for "${searchQuery}" on Travel2`,
      },
      {
        name: "twitter:description",
        content: `Explore posts and travel stories related to "${searchQuery}".`,
      },
    ],
  };
};
