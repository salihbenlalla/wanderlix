import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import { useDocumentHead } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";

import styles from "./style.css?inline";

export default component$(() => {
  useStyles$(styles);

  const x = useDocumentHead();
  console.log(x);
  return (
    <div class="post-content">
      <Slot />
    </div>
  );
});

interface EndpointData {
  canonical: string;
  slug: string;
  frVersion: string;
  enVersion: string;
  authorName: string;
  authorUrl: string;
  tagName: string;
  tagUrl: string;
  breadcrumbs: string[];
  title: string;
  description: string;
  image: string;
  imageWidth: string;
  imageHeight: string;
  readDuration: string;
  datePublished: string;
  dateModified: string;
  imageType: string;
}

export const head: DocumentHead<EndpointData> = ({ head }) => {
  //   console.log(head);
  return {
    title: `MyCompany - ${head.title}`,
    meta: [
      {
        name: "og:image",
        content: head.frontmatter.image,
      },
    ],
  };
};
