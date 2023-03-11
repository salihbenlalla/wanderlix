import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import { useDocumentHead } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { formatDate } from "~/lib/helpers/formatDate";

import styles from "./style.css?inline";
import PostHeader from "~/components/PostHeader";
import PostCommentSection from "~/components/PostCommentSection";
import type { CommentSingleProps } from "~/components/PostCommentSection/CommentSingle";
import { routeLoader$ } from "@builder.io/qwik-city";

interface LoaderData {
  comments: CommentSingleProps[];
}

export const getComments = routeLoader$<LoaderData>(async (ev) => {
  //   const { results } = await ev.platform.DB.prepare(
  //     "SELECT * FROM Customers WHERE CompanyName = ?"
  //   )
  //     .bind("Bs Beverages")
  //     .all();
  //   console.log("results from routLoader", results);
  return {
    comments: [
      {
        website: "johndoe@gmail.com",
        avatarImage:
          "https://thumbs.dreamstime.com/b/thoughtful-office-worker-thinking-problem-solution-looking-computer-working-serious-smart-young-businessman-employee-138893862.jpg",
        authorName: "John Doe",
        date: "2023-03-10T12:00:20+00:00",
        text: "Hello, this Is My First Comment",
      },
      {
        website: "johnsmith@gmail.com",
        avatarImage:
          "https://previews.123rf.com/images/fizkes/fizkes2007/fizkes200701460/151824697-headshot-portrait-of-smiling-confident-young-caucasian-businessman-in-glasses-posing-in-office.jpg",
        authorName: "John Smith",
        date: "2023-03-10T12:00:20+00:00",
        text: "Hello, My name is John Smith",
      },
    ],
  };
});

export default component$(() => {
  useStyles$(styles);

  const head = useDocumentHead();
  const comments = getComments();
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
      <PostCommentSection comments={comments.value.comments} />
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
