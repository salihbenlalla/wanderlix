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
    title: `Privacy Policy`,
    links: [
      {
        rel: "canonical",
        href: `${origin}/privacy-policy/`, // Canonical URL for the Privacy Policy page
      },
    ],
    meta: [
      {
        name: "description",
        content: `Read the privacy policy of ${siteName}, and understand how we handle your data and ensure your privacy.`,
      },
      {
        property: "og:type",
        content: "website", // It's a generic information page
      },
      {
        property: "og:title",
        content: `Privacy Policy - ${siteName}`,
      },
      {
        property: "og:description",
        content: `Read the privacy policy of ${siteName}, and understand how we handle your data and ensure your privacy.`,
      },
      {
        property: "og:url",
        content: `${origin}/privacy-policy/`, // Privacy Policy page URL
      },
      {
        name: "author",
        content: origin,
      },
      {
        name: "twitter:card",
        content: "summary", // Twitter card type for a privacy policy
      },
      {
        name: "twitter:title",
        content: `Privacy Policy - ${siteName}`,
      },
      {
        name: "twitter:description",
        content: `Read the privacy policy of ${siteName}, and understand how we handle your data and ensure your privacy.`,
      },
      {
        name: "robots",
        content: "noindex, nofollow", // Privacy policy pages are often excluded from indexing
      },
    ],
  };
};
