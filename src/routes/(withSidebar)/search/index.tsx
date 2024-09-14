import { component$ } from "@builder.io/qwik";
import { type RequestEventLoader, routeLoader$ } from "@builder.io/qwik-city";
import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import PostsGrid from "~/components/PostsGrid";
import GridHeader from "~/components/PostsGrid/GridHeader";
import { getSearchData } from "./getSearchData";

export const useGetSearchData = routeLoader$(
  async (ev: RequestEventLoader<PlatformCloudflarePages>) => {
    const destinationPosts = await getSearchData(ev);

    return destinationPosts;
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

  return (
    <>
      <div class="sub-header">
        <GridHeader
          pageTitle={`Search result for: ${searchData.searchQuery}`}
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
