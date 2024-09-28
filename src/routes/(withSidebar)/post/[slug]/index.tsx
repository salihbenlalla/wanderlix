import {
  routeLoader$,
  type RequestEventLoader,
  type DocumentHead,
  type StaticGenerateHandler,
} from "@builder.io/qwik-city";
import { $, component$ } from "@builder.io/qwik";
import { getPost } from "~/lib/helpers/getPosts";
import PostHeader from "~/components/PostHeader";
import PostCommentSection from "~/components/PostCommentSection";
import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import { formatDate } from "~/lib/helpers/formatDate";
import { type ImageTransformerProps, getSrcSet } from "qwik-image";
import { runSync } from "@mdx-js/mdx";
import * as runtime from "@builder.io/qwik/jsx-runtime";
import { Fragment } from "@builder.io/qwik";
import { contextComponents } from "~/components/MDXProvider/contextComponents";
import { getSlugs } from "~/lib/helpers/getSlugs";
import NextPrevPost from "~/components/NextPrevPost";
import AboutAuthor from "~/components/AboutAuthor";
import PostFooter from "~/components/PostFooter";
import { getOrigin } from "~/lib/helpers/getOrigin";

export const useGetPost = routeLoader$(
  async (ev: RequestEventLoader<PlatformCloudflarePages>) => {
    const post = await getPost(ev);
    return post;
  }
);

export default component$(() => {
  const post = useGetPost().value;

  if ("failed" in post) {
    return (
      <>
        <div class="sub-header"></div>
        <div class="page-content">
          <h1>{post.message}</h1>
        </div>
      </>
    );
  }

  const { default: code } = runSync(post.content, runtime);
  const Content = code ? code : Fragment;

  return (
    <>
      <div class="sub-header">
        <PostHeader
          title={post.title}
          authorName={post.authorName}
          authorAvatar={post.authorAvatar}
          tagName={post.tagName}
          dateModified={formatDate(post.dateModified)}
          image={post.image}
          imageWidth={post.imageWidth}
          imageHeight={post.imageHeight}
          countryName={post.countryName}
          countryParam={post.countryParam}
          stateName={post.stateName}
          stateParam={post.stateParam}
          cityName={post.cityName}
          cityParam={post.cityParam}
        />
      </div>
      <div class="page-content">
        {/* <Slot /> */}
        <Content components={contextComponents} />
        <PostFooter
          tagName={post.tagName}
          tagUrl={post.tagUrl}
          postTitle={post.title}
          postDescription={post.description}
          postImage={post.image}
        />
        <AboutAuthor
          name={post.authorName}
          bio={post.authorBio}
          url={post.authorUrl}
          imageUrl={post.authorImageUrl}
        />
        <NextPrevPost
          prevPostSlug={post.prevPostSlug}
          prevPostTitle={post.prevPostTitle}
          nextPostSlug={post.nextPostSlug}
          nextPostTitle={post.nextPostTitle}
        />
        <PostCommentSection postSlug={post.slug} />
      </div>
    </>
  );
});

const imageTransformer$ = $(
  ({ src, width, height }: ImageTransformerProps): string => {
    return `/images/${width}/${height}/${src.split("/")[4]}`;
  }
);

export const useDocumentHeadData = routeLoader$(async ({ resolveValue }) => {
  const post = await resolveValue(useGetPost);

  const imgSrc = `/images/${post.imageWidth}/${post.imageHeight}/${post.image}`;

  const srcSet = await getSrcSet({
    src: imgSrc,
    width: post.imageWidth,
    height: post.imageHeight,
    layout: "fullWidth",
    resolutions: [1280, 960, 640, 320, 160],
    aspectRatio:
      post.imageWidth && post.imageHeight
        ? post.imageWidth / post.imageHeight
        : undefined,
    imageTransformer$,
  });
  return { post, srcSet, imgSrc };
});

export const head: DocumentHead = ({ resolveValue, url }) => {
  const { post, srcSet, imgSrc } = resolveValue(useDocumentHeadData);
  const origin = getOrigin(url);


  return {
    title: post.title,
    links: [
      {
        rel: "canonical",
        href: `${origin}/post/${post.slug}/`
      },
      {
        rel: "preload",
        as: "image",
        imagesrcset: srcSet,
        imagesizes: "100vw",
        fetchpriority: "high",
        href: imgSrc,
      },
    ],
    meta: [
      {
        name: "description",
        content: post.description,
      },
      {
        property: "og:type",
        content: "article",
      },
      {
        property: "og:title",
        content: post.title,
      },
      {
        property: "og:description",
        content: post.description,
      },
      {
        property: "og:url",
        content: `${origin}/post/${post.slug}/`,
      },
      // {
      //   property: "article:publisher",
      //   content: "https://www.facebook.com/travel2"
      // },
      {
        property: "article:published_time",
        content: post.datePublished,
      },
      {
        property: "og:image",
        content: post.image,
      },
      {
        property: "og:image:width",
        content: `${post.imageWidth}`,
      },
      {
        property: "og:image:height",
        content: `${post.imageHeight}`,
      },
      {
        property: "og:image:type",
        content: post.imageType,
      },
      {
        name: "author",
        content: post.authorName,
      },
      {
        name: "twitter:label1",
        content: "by",
      },
      {
        name: "twitter:data1",
        content: post.authorName,
      },
      {
        name: "twitter:label2",
        content: "estimated reading time",
      },
      {
        name: "twitter:data2",
        content: `${post.readDuration} minutes`,
      },
    ],
  };
};

export const onStaticGenerate: StaticGenerateHandler = async (env) => {
  // eslint-disable-next-line
  const slugs = (await getSlugs(env)) ?? [];

  return {
    params: slugs.map((slug) => {
      return { slug };
    }),
  };
};
