import { component$, useStyles$ } from "@builder.io/qwik";
import ShareIcon from "~/assets/icomoon_svg/share2.svg?component";
import MoreIcon from "~/assets/icomoon_svg/morehoriz.svg?component";
import styles from "./style.css?inline";
// import { type PostCard } from "~/lib/helpers/getPosts";
import { formatDate } from "~/lib/helpers/formatDate";
import { Link } from "@builder.io/qwik-city";

export interface PostCardData {
  title: string;
  dateModified: string;
  slug: string;
  description: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  authorName: string;
  authorAvatar: string;
  authorUrl: string;
  tagName: string;
  tagUrl: string;
}

export interface PostCardWithStats extends PostCardData {
  total_pages: number;
}

interface PostCardProps extends PostCardData {
  format: "list" | "grid";
}

export default component$<PostCardProps>((props) => {
  useStyles$(styles);

  const isList = props.format === "list" ? true : false;

  const imageWidth = 320;
  const imageHeight = Math.round(props.imageHeight / 4);

  return (
    <div class={`post-card${isList ? " format-list" : ""}`}>
      <div class={`post-card-content${isList ? " format-list" : ""}`}>
        <div class={`post-card-image${isList ? " format-list" : ""}`}>
          <Link href={`/post/${props.slug}`}>
            <img
              src={`/images/${imageWidth}/${imageHeight}/${props.image}`}
              // width={isList ? 330 : 550}
              // height={isList ? 250 : 367}
              width={imageWidth}
              height={imageHeight}
            />
          </Link>
        </div>
        <div class={`post-card-body${isList ? " format-list" : ""}`}>
          <div class={`post-card-details${isList ? " format-list" : ""}`}>
            <ul>
              <li>
                <Link
                  href={`/author/${props.authorUrl}`}
                  title={`Posts by ${props.authorName}`}
                  rel="author"
                >
                  <img width="32" height="32" src={props.authorAvatar} />
                  {props.authorName}
                </Link>
              </li>
              <li>{formatDate(props.dateModified)}</li>
            </ul>
            <h5>
              <Link href={`/post/${props.slug}`}>{props.title}</Link>
            </h5>
            <p>{props.description}</p>
          </div>
          <div class={`post-card-bottom${isList ? " format-list" : ""}`}>
            <span class="share-icon">
              <ShareIcon width="16" height="16" viewBox="0 0 32 32" />
            </span>
            <span class="more-icon">
              <MoreIcon width="24" height="16" viewBox="0 4 24 16" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});
