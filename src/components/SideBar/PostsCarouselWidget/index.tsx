import { component$, useSignal, useStore, useStyles$ } from "@builder.io/qwik";
// import { isBrowser } from "@builder.io/qwik/build";
import WidgetContainer from "../WidgetContainer";
import styles from "./style.css?inline";
import CheveronRight from "/src/assets/icomoon_svg/cheveron-right.svg?component";
import CheveronLeft from "/src/assets/icomoon_svg/cheveron-left.svg?component";

export interface CarouselPost {
  title: string;
  thumbnail?: string;
  date?: string;
  url: string;
  author?: string;
  authorUrl?: string;
}

export interface PostsCarouselWidgetProps {
  title?: string;
  posts: CarouselPost[];
}

interface Store {
  posts: CarouselPost[];
}

declare global {
  interface Window {
    timer?: ReturnType<typeof window.setTimeout>;
  }
}

export default component$<PostsCarouselWidgetProps>((props) => {
  useStyles$(styles);

  const store = useStore<Store>({
    posts: [...props.posts],
  });
  const movingLeft = useSignal(false);
  const movingRight = useSignal(false);

  const ulRef = useSignal<HTMLUListElement>();

  return (
    <WidgetContainer title={props.title}>
      {store.posts.length && (
        <>
          <div class="carousel-posts-container">
            <ul class={`carousel-posts-list`} ref={ulRef}>
              {store.posts.map((post) => {
                return (
                  <>
                    <li key={`carousel-post-${post.title}`}>
                      <div class="carousel-post-thumbnail">
                        <a href={post.url}>
                          <div class="carousel-post-thumbnail-inner">
                            <img src={post.thumbnail} alt={post.title} />
                          </div>
                        </a>
                      </div>
                      <div class="carousel-post-details">
                        <a href={post.url}>
                          <h6 class="carousel-post-title">{post.title}</h6>
                        </a>
                        <ul class="carousel-post-meta">
                          <li>
                            <a href={post.authorUrl}>{post.author}</a>
                          </li>
                          <li>{post.date}</li>
                        </ul>
                      </div>
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
          <div class="carousel-arrows">
            <button
              class="carousel-arrow-left"
              onClick$={() => {
                movingRight.value = true;

                if (window.timer) clearTimeout(window.timer);
                window.timer = setTimeout(() => {
                  ulRef.value?.classList.remove("move-right");
                  const sotrePosts = store.posts.map((post) => ({
                    author: post.author,
                    authorUrl: post.authorUrl,
                    date: post.date,
                    thumbnail: post.thumbnail,
                    title: post.title,
                    url: post.url,
                  }));
                  const lastPost = sotrePosts.pop();

                  if (lastPost) {
                    store.posts = [lastPost, ...sotrePosts];
                  }
                  ulRef.value?.classList.add("move-right");
                }, 300);
              }}
            >
              <CheveronLeft />
            </button>
            <button
              class="carousel-arrow-right"
              onClick$={() => {
                movingLeft.value = true;
                ulRef.value?.classList.add("move-left");
                if (window.timer) clearTimeout(window.timer);
                window.timer = setTimeout(() => {
                  const sotrePosts = store.posts.map((post) => ({
                    author: post.author,
                    authorUrl: post.authorUrl,
                    date: post.date,
                    thumbnail: post.thumbnail,
                    title: post.title,
                    url: post.url,
                  }));
                  const firstPost = sotrePosts.shift();

                  if (firstPost) {
                    store.posts = [...sotrePosts, firstPost];
                  }
                  ulRef.value?.classList.remove("move-left");
                }, 300);
              }}
            >
              <CheveronRight />
            </button>
          </div>
        </>
      )}
    </WidgetContainer>
  );
});
