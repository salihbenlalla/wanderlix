import { component$, useStyles$ } from "@builder.io/qwik";
import { type RequestEventLoader, routeLoader$ } from "@builder.io/qwik-city";
import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import GridHeader from "~/components/PostsGrid/GridHeader";
import { getDestinations } from "./getDestinations";
import { v4 as uuidv4 } from "uuid";
import DestinationCard from "~/components/DestinationCard";
import styles from "./style.css?inline";

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
