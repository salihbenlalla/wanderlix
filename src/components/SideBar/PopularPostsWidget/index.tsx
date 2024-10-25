import { component$, useStyles$ } from "@builder.io/qwik";
// import { Image } from "qwik-image";
import WidgetContainer from "../WidgetContainer";
import styles from "./style.css?inline";
import { formatDate } from "~/lib/helpers/formatDate";
import { v4 as uuidv4 } from "uuid";
import { Link } from "@builder.io/qwik-city";

export interface PopularPost {
  title: string;
  image: string;
  dateModified: string;
  slug: string;
}

export interface PopularPostsWidgetProps {
  title?: string;
  posts: PopularPost[];
}

export default component$<PopularPostsWidgetProps>((props) => {
  useStyles$(styles);

  return (
    <WidgetContainer title={props.title}>
      {props.posts.length && (
        <ul class="popular-posts-list">
          {props.posts.map((post) => {
            return (
              <li key={uuidv4()}>
                <div class="post-thumbnail">
                  <Link href={`/post/${post.slug}`}>
                    <div class="post-thumbnail-inner">
                      <img
                        src={`/images/thumbnail/${post.image}`}
                        alt={post.title}
                        width={60}
                        height={60}
                        loading="lazy"
                      />
                    </div>
                  </Link>
                </div>
                <div class="post-details">
                  <Link href={`/post/${post.slug}`}>
                    <h4 class="post-title">{post.title}</h4>
                  </Link>
                  <p class="post-date">{formatDate(post.dateModified)}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </WidgetContainer>
  );
});
