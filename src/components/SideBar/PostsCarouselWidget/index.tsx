import {
  component$,
  useStore,
  useStyles$,
  useVisibleTask$,
} from "@builder.io/qwik";
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
  movingLeft: boolean;
  movingRight: boolean;
}

export default component$<PostsCarouselWidgetProps>((props) => {
  useStyles$(styles);
  const store = useStore<Store>({
    posts: props.posts,
    movingLeft: false,
    movingRight: false,
  });
  //   useVisibleTask$(({ track }) => {
  //     track(store.movingLeft);
  //     setTimeout(() => {
  //       store.movingLeft = false;
  //     }, 3000);
  //   });

  useVisibleTask$(({ track }) => {
    track(store.movingRight);
    setTimeout(() => {
      store.movingRight = false;
    }, 300);
  });
  return (
    <WidgetContainer title={props.title}>
      {store.posts.length && (
        <>
          <div class="carousel-posts-container">
            <ul
              class={`carousel-posts-list${
                store.movingLeft ? " move-left" : ""
              }${store.movingRight ? " move-right" : ""}`}
            >
              {store.posts.map((post, index) => {
                return (
                  <>
                    <li key={`carousel-post-${index}`}>
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
                const firstPost = store.posts.shift();
                if (firstPost) {
                  store.posts = [...store.posts, firstPost];
                }
                store.movingRight = true;
              }}
            >
              <CheveronLeft />
            </button>
            <button
              class="carousel-arrow-right"
              onClick$={() => {
                const lastPost = store.posts.pop();
                if (lastPost) {
                  store.posts = [lastPost, ...store.posts];
                }
                store.movingLeft = true;
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
