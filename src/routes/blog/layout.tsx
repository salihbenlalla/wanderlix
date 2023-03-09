import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import { useDocumentHead } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { formatDate } from "~/lib/helpers/formatDate";

import styles from "./style.css?inline";
import PostHeader from "~/components/PostHeader";

export default component$(() => {
  useStyles$(styles);

  const head = useDocumentHead();
  //   console.log(head);
  return (
    <div class="post-content">
      <PostHeader
        title={head.title}
        authorName={head.frontmatter.authorName}
        authorAvatar="/images/fake-avatar.jpg"
        tagName={head.frontmatter.tagName}
        dateModified={formatDate(head.frontmatter.dateModified)}
        image={head.frontmatter.image}
      />
      <Slot />
    </div>
  );
});

// interface Frontmatter {
//   canonical: string;
//   slug: string;
//   frVersion: string;
//   enVersion: string;
//   authorName: string;
//   authorUrl: string;
//   tagName: string;
//   tagUrl: string;
//   breadcrumbs: string[];
//   title: string;
//   description: string;
//   image: string;
//   imageWidth: string;
//   imageHeight: string;
//   readDuration: string;
//   datePublished: string;
//   dateModified: string;
//   imageType: string;
// }

export const head: DocumentHead = ({ head }) => {
  //   console.log(head);
  return {
    title: head.title,
    meta: [
      {
        "http-equiv": "Content-Type",
        content: "text/html; charset=utf-8",
      },
      {
        name: "theme-color",
        content: "#01a0c6",
      },
      {
        name: "robots",
        content:
          "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      {
        property: "og:locale",
        content: "en_US",
      },
      {
        property: "og:type",
        content: "article",
      },
      {
        property: "og:title",
        content: head.title,
      },
      {
        property: "og:description",
        content: head.meta.find((obj) => obj.name === "description")?.content,
      },
      {
        property: "og:url",
        content: `https://travel2.ml/${head.frontmatter.slug}/`,
      },
      // {
      //   property: "og:site_name",
      //   content: "travel2.ml"
      // },
      // {
      //   property: "article:publisher",
      //   content: "https://www.facebook.com/travel2"
      // },
      {
        property: "article:published_time",
        content: head.frontmatter.datePublished,
      },
      {
        property: "og:image",
        content: head.frontmatter.image,
      },
      {
        property: "og:image:width",
        content: head.frontmatter.imageWidth,
      },
      {
        property: "og:image:Height",
        content: head.frontmatter.imageHeight,
      },
      {
        property: "og:image:type",
        content: head.frontmatter.imageType,
      },
      {
        name: "author",
        content: head.frontmatter.authorName,
      },
      {
        name: "twitter:label1",
        content: "by",
      },
      {
        name: "twitter:data1",
        content: head.frontmatter.authorName,
      },
      {
        name: "twitter:label2",
        content: "estimated reading time",
      },
      {
        name: "twitter:data2",
        content: head.frontmatter.readDuration,
      },
    ],
    links: [
      {
        rel: "dns-prefetch",
        href: "https://cdn.travel2.ml",
      },
    ],
  };
};
