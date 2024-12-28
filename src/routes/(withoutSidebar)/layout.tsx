import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import { useLocation, type DocumentHead } from "@salihbenlalla/qwik-city";
import GridHeader from "~/components/PostsGrid/GridHeader";
import { getOrigin } from "~/lib/helpers/getOrigin";
import { getSiteName } from "~/lib/helpers/getSiteName";
import styles from "./style.css?inline";

export default component$(() => {
  useStyles$(styles);

  const loc = useLocation();

  const pageTitle =
    loc.url.pathname.split("/")[1] === "privacy-policy"
      ? "Privacy Policy"
      : "About Us";

  return (
    <>
      <div class="sub-header">
        <GridHeader pageTitle={pageTitle} />
      </div>
      <div class="page-content container">
        <Slot />
      </div>
    </>
  );
});

export const head: DocumentHead = ({ url }) => {
  const origin = getOrigin();
  const siteName = getSiteName();
  const isPrivacyPolicy = url.pathname.includes("privacy-policy");

  const pageTitle = isPrivacyPolicy ? "Privacy Policy" : "About Us";
  const pageDescription = isPrivacyPolicy
    ? `Read the privacy policy of ${siteName}, and understand how we handle your data and ensure your privacy.`
    : `Learn more about ${siteName}, our mission, and what we offer to our readers.`;

  return {
    title: `${pageTitle} - ${siteName}`,
    links: [
      {
        rel: "canonical",
        href: `${origin}${isPrivacyPolicy ? "/privacy-policy/" : "/about-us/"}`,
      },
    ],
    meta: [
      {
        name: "description",
        content: pageDescription,
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:title",
        content: `${pageTitle} - ${siteName}`,
      },
      {
        property: "og:description",
        content: pageDescription,
      },
      {
        property: "og:url",
        content: `${origin}${isPrivacyPolicy ? "/privacy-policy/" : "/about-us/"}`,
      },
      {
        name: "author",
        content: origin,
      },
      {
        name: "twitter:card",
        content: "summary",
      },
      {
        name: "twitter:title",
        content: `${pageTitle} - ${siteName}`,
      },
      {
        name: "twitter:description",
        content: pageDescription,
      },
      {
        name: "robots",
        content: isPrivacyPolicy ? "noindex, nofollow" : "index, follow",
      },
    ],
  };
};
