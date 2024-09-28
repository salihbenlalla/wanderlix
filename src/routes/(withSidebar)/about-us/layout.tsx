import { component$, Slot } from "@builder.io/qwik";
import { type DocumentHead } from "@salihbenlalla/qwik-city";
import GridHeader from "~/components/PostsGrid/GridHeader";
import { getOrigin } from "~/lib/helpers/getOrigin";
import { getSiteName } from "~/lib/helpers/getSiteName";
// import styles from "./style.css?inline";

export default component$(() => {
  //   useStyles$(styles);

  return (
    <>
      <div class="sub-header">
        <GridHeader pageTitle="Privacy Policy" />
      </div>
      <div class="page-content">
        <Slot />
      </div>
    </>
  );
});


export const head: DocumentHead = ({ url }) => {
  const origin = getOrigin(url);

  const siteName = getSiteName();

  return {
    title: `About Us`,
    links: [
      {
        rel: "canonical",
        href: `${origin}/about-us/`, // Canonical URL for the About page
      },
    ],
    meta: [
      {
        name: "description",
        content: `Learn more about ${siteName}, your go-to platform for discovering amazing travel destinations, tips, and guides.`,
      },
      {
        property: "og:type",
        content: "website", // It's a generic information page
      },
      {
        property: "og:title",
        content: "About Us - travel2.ml",
      },
      {
        property: "og:description",
        content: `Learn more about ${siteName}, your go-to platform for discovering amazing travel destinations, tips, and guides.`,
      },
      {
        property: "og:url",
        content: `${origin}/about/`, // About page URL
      },
      {
        property: "og:image",
        content: `${origin}/assets/about-us-cover.jpg`, // Image representing the about page
      },
      {
        property: "og:image:width",
        content: "1200", // Ensure good social media preview size
      },
      {
        property: "og:image:height",
        content: "630",
      },
      {
        property: "og:image:type",
        content: "image/jpeg",
      },
      {
        name: "author",
        content: "travel2.ml",
      },
      {
        name: "twitter:card",
        content: "summary_large_image", // Twitter card type for a large image
      },
      {
        name: "twitter:title",
        content: "About Us - travel2.ml",
      },
      {
        name: "twitter:description",
        content: "Learn more about travel2.ml, your go-to platform for discovering amazing travel destinations, tips, and guides.",
      },
      {
        name: "twitter:image",
        content: `${origin}/assets/about-us-cover.jpg`, // Image for Twitter card
      },
      {
        name: "robots",
        content: "index, follow", // Allow indexing and following links
      },
    ],
  };
};
