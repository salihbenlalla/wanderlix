import {
  $,
  component$,
  useContext,
  useSignal,
  useStyles$,
  useTask$,
} from "@builder.io/qwik";
import { type ImageTransformerProps, getSrcSet } from "qwik-image";
import BubbleIcon from "~/assets/icomoon_svg/bubble2.svg?component";
import { formatDate } from "~/lib/helpers/formatDate";
import styles from "./style.css?inline";
import { ThemeContext } from "~/routes/layout";
import { Link } from "@builder.io/qwik-city";

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

  const srcSet = useSignal<string>("");

  const imageTransformer$ = $(
    ({ src, width, height }: ImageTransformerProps): string => {
      return `/images/${width}/${height}/${src.split("/")[4]}`;
    }
  );

  useTask$(async () => {
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
        <img
          src={`/images/${props.imageWidth}/${props.imageHeight}/${props.image}`}
          srcset={srcSet.value}
          alt="Post image"
          loading="eager"
          width={props.imageWidth}
          height={props.imageHeight}
        />
      </div>
      <div class="container">
        <div class="cover-content">
          <nav class="breadcrumbs">
            <ol>
              {props.countryName && (
                <li class="breadcrumb">
                  <Link href={`/destination/${props.countryParam}`}>
                    {props.countryName}
                  </Link>
                </li>
              )}

              {props.stateName && (
                <li class="breadcrumb">
                  <Link
                    href={`/destination/${props.countryParam}/${props.stateParam}`}
                  >
                    {props.stateName}
                  </Link>
                </li>
              )}

              {props.cityName && (
                <li class="breadcrumb">
                  <Link
                    href={`/destination/${props.countryParam}/${props.stateParam}/${props.cityParam}`}
                  >
                    {props.cityName}
                  </Link>
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
                  <Link href={authorUrl} title={`Posts by ${props.authorName}`}>
                    <img
                      src={props.authorAvatar}
                      alt={props.authorName}
                      width="32"
                      height="32"
                    />
                  </Link>
                  {/* <Image
                    layout="fullWidth"
                    objectFit="cover"
                    aspectRatio={32 / 32}
                    width={32}
                    height={32}
                    alt="alt text"
                    placeholder="#e6e6e6"
                    src={props.authorAvatar}
                    loading="lazy"
                  /> */}
                </span>
                <Link href={authorUrl} title={`Posts by ${props.authorName}`}>
                  {props.authorName}
                </Link>
              </li>
              <li>
                <Link href={tagUrl} title={`Posts tagged ${props.tagName}`}>
                  {props.tagName}
                </Link>
              </li>
              <li>{formatDate(props.dateModified)}</li>
              <li class="comment-count">
                <BubbleIcon viewBox="0 0 32 32" width="16" height="16" /> (
                {theme.commentsCount})
              </li>
            </ul>
            {/* <div class="post-header-image">
            <img src={props.image} />
          </div> */}
          </div>
        </div>
      </div>
    </section>
  );
});

export default PostHeader;
