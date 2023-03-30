import {
  $,
  component$,
  useSignal,
  useStore,
  //   useStore,
  useStyles$,
  useTask$,
} from "@builder.io/qwik";
import { isBrowser } from "@builder.io/qwik/build";
import { v4 as uuidv4 } from "uuid";
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
  translateValues: number[];
}

declare global {
  interface Window {
    timer?: ReturnType<typeof window.setTimeout>;
  }
}

export const getTranslateValues = (
  posts: CarouselPost[],
  activeIndex: number
) => {
  const halfOfPosts = Math.floor(posts.length / 2);
  return posts.map((post, index) => {
    if (index > activeIndex) {
      if (index - activeIndex <= halfOfPosts) {
        return 298 * (index - activeIndex);
      } else {
        return -298 * (activeIndex + posts.length - index);
      }
    } else {
      if (activeIndex - index <= halfOfPosts) {
        return -298 * (activeIndex - index);
      } else {
        return 298 * (posts.length + index - activeIndex);
      }
    }
  });
};

export default component$<PostsCarouselWidgetProps>((props) => {
  useStyles$(styles);

  const ulRef = useSignal<HTMLUListElement>();
  const activeIndex = useSignal<number>(0);
  const direction = useSignal<"prev" | "next" | null>(null);
  const carouselWidth = useSignal<number>(props.posts.length * 298);
  const store = useStore<Store>(
    { translateValues: getTranslateValues(props.posts, activeIndex.value) },
    { deep: true }
  );

  useTask$(({ track }) => {
    track(activeIndex);
    if (isBrowser) {
      store.translateValues = getTranslateValues(
        props.posts,
        activeIndex.value
      );
      console.log("translate values: ", store.translateValues);
    }
  });

  const handleNext = $(() => {
    direction.value = "next";
  });

  const handlePrev = $(() => {
    direction.value = "prev";
  });

  const handleTransitionEnd = $(() => {
    if (direction.value === "next") {
      activeIndex.value =
        activeIndex.value + 1 === props.posts.length
          ? 0
          : activeIndex.value + 1;
    } else if (direction.value === "prev") {
      activeIndex.value =
        activeIndex.value === 0
          ? props.posts.length - 1
          : activeIndex.value - 1;
    }
    direction.value = null;
  });

  const ulStyle = () => {
    return {
      width: carouselWidth.value,
    };
  };

  const liStyle = (index: number) => {
    return {
      transform: `translateX(${store.translateValues[index]}px)`,
    };
  };

  return (
    <WidgetContainer title={props.title}>
      {props.posts.length && (
        <>
          <div class="carousel-posts-container">
            <ul
              class={`carousel-posts-list move-${direction.value}`}
              ref={ulRef}
              style={ulStyle()}
              onTransitionEnd$={handleTransitionEnd}
            >
              {props.posts.map((post, index) => {
                return (
                  <li key={`carousel-post-${uuidv4()}`} style={liStyle(index)}>
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
                );
              })}
            </ul>
          </div>
          <div class="carousel-arrows">
            <button class="carousel-arrow-left" onClick$={handlePrev}>
              <CheveronLeft />
            </button>
            <button class="carousel-arrow-right" onClick$={handleNext}>
              <CheveronRight />
            </button>
          </div>
        </>
      )}
    </WidgetContainer>
  );
});
