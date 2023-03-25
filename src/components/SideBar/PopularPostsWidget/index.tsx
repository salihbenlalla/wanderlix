import { component$, useStyles$ } from "@builder.io/qwik";
import WidgetContainer from "../WidgetContainer";
import styles from "./style.css?inline";

export interface PopularPost {
  title: string;
  thumbnail?: string;
  date?: string;
  url: string;
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
          {props.posts.map((post, index) => {
            return (
              <>
                <li key={`post-${index}`}>
                  <div class="post-thumbnail">
                    <a href={post.url}>
                      <div class="post-thumbnail-inner">
                        <img src={post.thumbnail} alt={post.title} />
                      </div>
                    </a>
                  </div>
                  <div class="post-details">
                    <a href={post.url}>
                      <h6 class="post-title">{post.title}</h6>
                    </a>
                    <p class="post-date">{post.date}</p>
                  </div>
                </li>
                {index < props.posts.length - 1 && (
                  <div class="popular-posts-list-separator"></div>
                )}
              </>
            );
          })}
        </ul>
      )}
    </WidgetContainer>
  );
});
