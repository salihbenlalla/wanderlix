import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Home from "../components/Home";
import { getOrigin } from "~/lib/helpers/getOrigin";
import { getSiteName } from "~/lib/helpers/getSiteName";

export default component$(() => {
  return <Home />;
});

export const head: DocumentHead = () => {
  const origin = getOrigin();
  const siteName = getSiteName();

  return {
    title: `${siteName} - Your Gateway to the World`,
    links: [
      {
        rel: "canonical",
        href: `${origin}/`,
      },
    ],
    meta: [
      {
        name: "description",
        content: `Discover exciting travel destinations, tips, and guides from ${siteName}.`,
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:title",
        content: `${siteName} - Your Gateway to the World`,
      },
      {
        property: "og:description",
        content: `Explore a wide range of travel destinations and plan your next adventure with ${siteName}.`,
      },
      {
        property: "og:url",
        content: `${origin}/`,
      },
      {
        property: "og:image",
        content: `${origin}/images/1280/854/megve-5.webp`, // Replace with actual image path
      },
      {
        property: "og:image:width",
        content: "1280",
      },
      {
        property: "og:image:height",
        content: "854",
      },
      {
        property: "og:site_name",
        content: siteName,
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: `${siteName} - Your Gateway to the World`,
      },
      {
        name: "twitter:description",
        content: `Find amazing travel destinations and tips at ${siteName}.`,
      },
      {
        name: "twitter:image",
        content: `${origin}/images/1280/854/megve-5.webp`, // Replace with actual image path
      },
    ],
  };
};
