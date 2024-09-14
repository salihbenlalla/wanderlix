import { component$ } from "@builder.io/qwik";
import {
  type RequestEventLoader,
  routeLoader$,
  type StaticGenerateHandler,
} from "@builder.io/qwik-city";
import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import PostsGrid from "~/components/PostsGrid";
import GridHeader from "~/components/PostsGrid/GridHeader";
import { getDestinationData } from "./getDestinationData";
import getDestinationParams from "./getDestinationParams";

export const useDestinationData = routeLoader$(
  async (ev: RequestEventLoader<PlatformCloudflarePages>) => {
    return await getDestinationData(ev);
  }
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
