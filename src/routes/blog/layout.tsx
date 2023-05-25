import { $, component$, Slot, useStyles$ } from "@builder.io/qwik";
import {
  routeLoader$,
  useDocumentHead,
  type RequestEventLoader,
  type DocumentHead,
  routeAction$,
  type RequestHandler,
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
import { getSrcSet, type ImageTransformerProps } from "qwik-image";

declare module "@builder.io/qwik-city/middleware/cloudflare-pages" {
  interface PlatformCloudflarePages {
    DB: D1Database;
  }
}

export const useGetComments = routeLoader$(
  async (ev: RequestEventLoader<PlatformCloudflarePages>) => {
    const comments = await handleGetComments(ev);

    return comments;
  }
);

export type AddCommentReturnValue = {
  success: boolean;
  id?: number;
};

export const useAddComment = routeAction$<AddCommentReturnValue>(
  async (comment, ev) => {
    const success = await handleAddComment(comment, ev);
    if (success) {
      return success;
    }
    return {
      success: false,
    };
  }
);

export const sidebar: SideBarProps = {
  popularPosts: {
    title: "Popular Posts",
    posts: [
      {
        title: "3 Easy Ways To Make Your iPhone Faster",
        url: "#",
        thumbnail: "thumbnail1_fxv0ga",
        date: "26 August 2022",
      },
      {
        title: "Facts About Business That Will Help You Success",
        url: "#",
        thumbnail: "thumbnail2_yiw0qd",
        date: "23 August 2022",
      },
      {
        title: "15 Unheard Ways To Achieve Greater Walker",
        url: "#",
        thumbnail: "thumbnail3_tpszao",
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
  postsCarousel: {
    title: "Read Also",
    posts: [
      {
        title: "Post 0",
        url: "#",
        thumbnail: "thumbnail4_eqbqjm",
        date: "26 August 2022",
        author: "John Doe",
        authorUrl: "#",
      },
      {
        title: "Post 1",
        url: "#",
        thumbnail: "thumbnail5_myxw3u",
        date: "23 August 2022",
        author: "John Smith",
        authorUrl: "#",
      },
      {
        title: "Post 2",
        url: "#",
        thumbnail: "thumbnail6_zvszzf",
        date: "23 August 2022",
        author: "matilda Smith",
        authorUrl: "#",
      },
      {
        title: "Post 3",
        url: "#",
        thumbnail: "thumbnail5_myxw3u",
        date: "23 August 2022",
        author: "John Smith",
        authorUrl: "#",
      },
      {
        title: "Post 4",
        url: "#",
        thumbnail: "thumbnail5_myxw3u",
        date: "23 August 2022",
        author: "John Smith",
        authorUrl: "#",
      },
    ],
  },
  tagClouds: {
    title: "Tag Clouds",
    tags: [
      {
        name: "Audio",
        url: "#",
      },
      {
        name: "Content",
        url: "#",
      },
      {
        name: "Featured",
        url: "#",
      },
      {
        name: "Image",
        url: "#",
      },
      {
        name: "Inspiration",
        url: "#",
      },
      {
        name: "Lifestyle",
        url: "#",
      },
      {
        name: "Photo",
        url: "#",
      },
      {
        name: "Pick",
        url: "#",
      },
      {
        name: "Slide",
        url: "#",
      },
      {
        name: "Trending",
        url: "#",
      },
    ],
  },
  sponsoredAd: {
    imageUrl: "ad-widget-photo_taucz3",
    adUrl: "#",
  },
};

export default component$(() => {
  useStyles$(styles);
  const head = useDocumentHead();
  const comments = useGetComments().value;
  const action = useAddComment();

  return (
    <>
      <PostHeader
        title={head.title}
        authorName={head.frontmatter.authorName}
        authorAvatar="fake-avatar_uwoskp"
        tagName={head.frontmatter.tagName}
        dateModified={formatDate(head.frontmatter.dateModified)}
        image={head.frontmatter.image}
        breadcrumbs={head.frontmatter.breadcrumbs}
      />
      <div class="main-content">
        <div class="container">
          <div class="post-container">
            <div class="post-content">
              <Slot />
              <PostCommentSection comments={comments} action={action} />
            </div>
            <div class="post-sidebar">
              <SideBar {...sidebar} />
            </div>
          </div>
        </div>
      </div>
    </>
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

const imageTransformer$ = $(
  ({ src, width, height }: ImageTransformerProps): string => {
    // Here you can set your favourite image loaders service
    return `/images/${src}-${width}x${height}.webp`;
    //   return `https://res.cloudinary.com/dlzx1x20u/image/upload/w_${width},h_${height},c_lfill,f_auto/v1684082099/travel2/${src}.webp`;
  }
);

export const useJoke = routeLoader$(async () => {
  // Fetch a joke from a public API

  const srcSet = await getSrcSet({
    src: "the-essential-things-to-do-riquewihr_lung0t",
    width: 1280,
    height: 600,
    layout: "fullWidth",
    resolutions: [1280, 960, 640, 320, 160],
    imageTransformer$,
  });
  return srcSet;
});

export const head: DocumentHead = ({ head, resolveValue, url }) => {
  const srcSet = resolveValue(useJoke);

  return {
    title: head.title,
    links: [
      {
        rel: "canonical",
        href: `https://travel2.ml${url.pathname}`,
      },
      {
        rel: "preload",
        as: "image",
        imagesrcset: srcSet,
        imagesizes: "100vw",
        fetchpriority: "high",
      },
      {
        rel: "dns-prefetch",
        href: "https://cdn.travel2.ml",
      },
    ],
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
  };
};

export const onGet: RequestHandler = (request) => {
  request.headers.set("Cache-Control", "no-cache");
};
