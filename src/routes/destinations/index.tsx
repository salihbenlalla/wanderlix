import { component$, useStyles$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import GridHeader from "~/components/PostsGrid/GridHeader";
import { v4 as uuidv4 } from "uuid";
import DestinationCard, {
  type DestinationCardProps,
} from "~/components/DestinationCard";
import styles from "./style.css?inline";
import { getOrigin } from "~/lib/helpers/getOrigin";
import { getSiteName } from "~/lib/helpers/getSiteName";
import destinationsByContinent from "./destinationsByContinent.json";

interface Continent {
  contintentName: string;
  continentId: string;
  destinations: DestinationCardProps[];
}

interface Continents {
  Europe: Continent;
  North_America: Continent;
  South_America: Continent;
  Africa: Continent;
  Asia: Continent;
  Oceania: Continent;
  World: Continent;
}

export default component$(() => {
  useStyles$(styles);

  const destinations: Continents = destinationsByContinent;

  return (
    <>
      <div class="sub-header">
        <GridHeader pageTitle={`Destinations`} />
      </div>
      <div class="container destinations-container">
        {(Object.values(destinations) as Continent[]).map((continent) => (
          <>
            <h2 class="continent-name" id={continent.continentId}>
              # {continent.contintentName}
            </h2>
            <div class="destinations-grid">
              {continent.destinations.map((destination) => (
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
          </>
        ))}
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
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "robots", content: "index, follow" }, // Allow indexing of the destinations page
    ],
  };
};
