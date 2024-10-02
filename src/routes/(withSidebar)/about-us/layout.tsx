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


export const head: DocumentHead = () => {

  const origin = getOrigin();

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
        content: `About Us - ${siteName}`,
      },
      {
        property: "og:description",
        content: `Learn more about ${siteName}, your go-to platform for discovering amazing travel destinations, tips, and guides.`,
      },
      {
        property: "og:url",
        content: `${origin}/about-us/`, // About page URL
      },
      {
        name: "author",
        content: origin,
      },
      {
        name: "twitter:card",
        content: "summary", // Twitter card type for a large image
      },
      {
        name: "twitter:title",
        content: `About Us - ${siteName}`,
      },
      {
        name: "twitter:description",
        content: `Learn more about ${siteName}, your go-to platform for discovering amazing travel destinations, tips, and guides.`,
      },
      {
        name: "robots",
        content: "index, follow", // Allow indexing and following links
      },
    ],
  };
};
