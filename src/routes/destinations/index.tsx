import { component$, useStyles$ } from "@builder.io/qwik";
import { type RequestEventLoader, routeLoader$, DocumentHead } from "@builder.io/qwik-city";
import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import GridHeader from "~/components/PostsGrid/GridHeader";
import { getDestinations } from "./getDestinations";
import { v4 as uuidv4 } from "uuid";
import DestinationCard from "~/components/DestinationCard";
import styles from "./style.css?inline";
import { getOrigin } from "~/lib/helpers/getOrigin";
import { getSiteName } from "~/lib/helpers/getSiteName";

export const useGetDestinations = routeLoader$(
  async (ev: RequestEventLoader<PlatformCloudflarePages>) => {
    return await getDestinations(ev);
  }
);

export default component$(() => {
  useStyles$(styles);

  const destinations = useGetDestinations().value;

  if ("failed" in destinations) {
    return (
      <>
        <div class="sub-header">
          <GridHeader pageTitle={destinations.message} />
        </div>
        <div class="container destinations-container"></div>
      </>
    );
  }

  return (
    <>
      <div class="sub-header">
        <GridHeader pageTitle={`Destinations`} />
      </div>
      <div class="container destinations-container">
        <div class="destinations-grid">
          {destinations.map((destination) => (
            <DestinationCard
              key={uuidv4()}
              country={destination.country}
              image={destination.image}
              imageWidth={destination.imageWidth}
              imageHeight={destination.imageHeight}
              param={destination.param}
              post_count={destination.post_count}
            />
          ))}
        </div>
      </div>
    </>
  );
});


export const head: DocumentHead = () => {
  const origin = getOrigin();
  const siteName = getSiteName();
  const title = `Destinations - ${siteName}`;
  const description = `Explore various countries and travel destinations featured in our blog. Discover tips, guides, and stories about your favorite places.`;
  const ogUrl = `${origin}/destinations/`;

  return {
    title,
    links: [
      { rel: "canonical", href: ogUrl },
    ],
    meta: [
      { name: "description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: ogUrl },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "robots", content: "index, follow" }, // Allow indexing of the destinations page
    ],
  };
};
