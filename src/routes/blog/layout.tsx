import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import {
  routeLoader$,
  useDocumentHead,
  type RequestEventLoader,
  type DocumentHead,
  routeAction$,
} from "@builder.io/qwik-city";
import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import { type D1Database } from "@miniflare/d1";
import PostHeader from "~/components/PostHeader";
import PostCommentSection from "~/components/PostCommentSection";
import { formatDate } from "~/lib/helpers/formatDate";
import {
  handleGetComments,
  handleAddComment,
} from "~/components/PostCommentSection/commentHandlers";
import styles from "./style.css?inline";
import SideBar, { type SideBarProps } from "~/components/SideBar";

declare module "@builder.io/qwik-city/middleware/cloudflare-pages" {
  interface PlatformCloudflarePages {
    DB: D1Database;
  }
}

export const getComments = routeLoader$(
  async (ev: RequestEventLoader<PlatformCloudflarePages>) => {
    const comments = await handleGetComments(ev);

    return comments;
  }
);

export type AddCommentReturnValue =
  | {
      success: boolean;
      id: number;
    }
  | undefined;

export const addComment = routeAction$<AddCommentReturnValue>(
  async (comment, ev) => {
    const success = await handleAddComment(comment, ev);
    return success;
  }
);

export const sidebar: SideBarProps = {
  popularPosts: {
    title: "Popular Posts",
    posts: [
      {
        title: "3 Easy Ways To Make Your iPhone Faster",
        url: "#",
        thumbnail: "/images/thumbnail1.jpg",
        date: "26 August 2022",
      },
      {
        title: "Facts About Business That Will Help You Success",
        url: "#",
        thumbnail: "/images/thumbnail2.jpg",
        date: "23 August 2022",
      },
      {
        title: "15 Unheard Ways To Achieve Greater Walker",
        url: "#",
        thumbnail: "/images/thumbnail3.jpg",
        date: "24 August 2022",
      },
    ],
  },
  destinations: {
    title: "Explore Destinations",
    destinations: [
      {
        name: "Algeria",
        url: "#",
        count: 5,
      },
      {
        name: "Morocco",
        url: "#",
        count: 7,
      },
      {
        name: "France",
        url: "#",
        count: 20,
      },
      {
        name: "Tunisia",
        url: "#",
        count: 25,
      },
      {
        name: "United States",
        url: "#",
        count: 10,
      },
      {
        name: "England",
        url: "#",
        count: 58,
      },
      {
        name: "Belgium",
        url: "#",
        count: 15,
      },
      {
        name: "Australia",
        url: "#",
        count: 9,
      },
      {
        name: "Brisil",
        url: "#",
        count: 8,
      },
    ],
  },
  newsletter: {
    title: "Newsletter",
    subscribersCount: 70000,
  },
};

export default component$(() => {
  useStyles$(styles);
  const head = useDocumentHead();
  const comments = getComments().value;
  const action = addComment();

  return (
    <div class="post-container">
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
        <PostCommentSection comments={comments} action={action} />
      </div>
      <div class="post-sidebar">
        <SideBar {...sidebar} />
      </div>
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
