import {
  component$,
  useContext,
  useSignal,
  useStyles$,
  $,
  useTask$
} from "@builder.io/qwik";
import BubbleIcon from "~/assets/icomoon_svg/bubble2.svg?component";
import { formatDate } from "~/lib/helpers/formatDate";
import styles from "./style.css?inline";
import { ThemeContext } from "~/routes/layout";
import { type ImageTransformerProps, getSrcSet } from "qwik-image";
import { ImageWithFallback } from "../ImageWithFallback";

interface PostHeaderProps {
  title: string;
  authorName: string;
  tagName: string;
  tagUrl: string;
  dateModified: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  authorAvatar: string;
  countryName: string;
  countryParam: string;
  stateName: string | null;
  stateParam: string | null;
  cityName: string | null;
  cityParam: string | null;
}

const PostHeader = component$<PostHeaderProps>((props) => {
  useStyles$(styles);
  const theme = useContext(ThemeContext);
  const authorUrl = `/author/${props.authorName
    .toLowerCase()
    .replace(/ /g, "-")}`;
  const tagUrl = `/tag/${props.tagUrl}/`

  const srcSet = useSignal<string | undefined>();

  const imageTransformer$ = $(
    ({ src, width, height }: ImageTransformerProps): string => {
      return `/images/${width}/${height}/${src.split("/")[4]}`;
    }
  );


  useTask$(async ({ track }) => {
    track(() => props.image)
    const imgSrc = `/images/${props.imageWidth}/${props.imageHeight}/${props.image}`;
    srcSet.value = await getSrcSet({
      src: imgSrc,
      width: props.imageWidth,
      height: props.imageHeight,
      layout: "fullWidth",
      resolutions: [1280, 960, 640, 320, 160],
      aspectRatio:
        props.imageWidth && props.imageHeight
          ? props.imageWidth / props.imageHeight
          : undefined,
      imageTransformer$,
    });
  });

  return (
    <section class="post-cover">
      <div class="post-header-image">
        <div class="post-header-overlay" />
        <ImageWithFallback
          src={`/images/${props.imageWidth}/${props.imageHeight}/${props.image}`}
          srcset={srcSet.value}
          alt="Post image"
          loading="eager"
          width={props.imageWidth}
          height={props.imageHeight}
          noFallback
        />
      </div>
      <div class="container">
        <div class="cover-content">
          <nav class="breadcrumbs">
            <ol>
              {props.countryName && (
                <li class="breadcrumb">
                  <a href={`/destination/${props.countryParam}`}>
                    {props.countryName}
                  </a>
                </li>
              )}

              {props.stateName && (
                <li class="breadcrumb">
                  <a
                    href={`/destination/${props.countryParam}/${props.stateParam}`}
                  >
                    {props.stateName}
                  </a>
                </li>
              )}

              {props.cityName && (
                <li class="breadcrumb">
                  <a
                    href={`/destination/${props.countryParam}/${props.stateParam}/${props.cityParam}`}
                  >
                    {props.cityName}
                  </a>
                </li>
              )}
              <li class="breadcrumb">
                <span>{props.title}</span>
              </li>
            </ol>
          </nav>
          <div class="post-header">
            <h1>{props.title}</h1>
            <ul>
              <li>
                <span class="author-avatar">
                  <a href={authorUrl} title={`Posts by ${props.authorName}`}>
                    <ImageWithFallback
                      src={props.authorAvatar}
                      alt={props.authorName}
                      width={32}
                      height={32}
                      loading="lazy"
                      exactDimensions
                    />
                  </a>
                </span>
                <a href={authorUrl} title={`Posts by ${props.authorName}`}>
                  {props.authorName}
                </a>
              </li>
              <li>
                <a href={tagUrl} title={`Posts tagged ${props.tagName}`}>
                  {props.tagName}
                </a>
              </li>
              <li>{formatDate(props.dateModified)}</li>
              <li class="comment-count">
                <BubbleIcon viewBox="0 0 32 32" width="16" height="16" /> (
                {theme.commentsCount})
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
});

export default PostHeader;
