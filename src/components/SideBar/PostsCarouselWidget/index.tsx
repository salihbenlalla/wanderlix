import {
  $,
  component$,
  type QwikTransitionEvent,
  type QRL,
  useSignal,
  useStore,
  useStyles$,
  useVisibleTask$,
  //   useTask$,
} from "@builder.io/qwik";
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
  postsOrder: number[];
}

type SingleOrArray<T> = T | (SingleOrArray<T> | undefined | null)[];

type HandleTransitionType =
  | SingleOrArray<
      (
        event: QwikTransitionEvent<HTMLUListElement>,
        element: HTMLUListElement
      ) => any
    >
  | undefined;

declare global {
  interface Window {
    timer?: ReturnType<typeof window.setTimeout>;
  }
}

export const getTranslateValues = (
  postsOrder: number[],
  margin: number = 0
) => {
  const halfOfPosts = Math.floor(postsOrder.length / 2);
  return postsOrder.map((post, index) => {
    if (index >= halfOfPosts) {
      return (298 + margin * 2) * (index - halfOfPosts);
    } else {
      return -(298 + margin * 2) * (halfOfPosts - index);
    }
  });
};

export default component$<PostsCarouselWidgetProps>((props) => {
  useStyles$(styles);
  const MARGIN = 10;

  const numbers = Array.from({ length: props.posts.length }, (_, i) => i);

  //   const position = useSignal<number>(0);
  const ulRef = useSignal<HTMLUListElement>();
  const direction = useSignal<"prev" | "next" | null>(null);
  const carouselWidth = useSignal<number>(props.posts.length * 298);
  const margin = useSignal(0);
  //   const goNextRequestRef = useSignal<number | null>(null);
  //   const goPrevRequestRef = useSignal<number | null>(null);

  const store = useStore<Store>(
    {
      translateValues: getTranslateValues(numbers, margin.value),
      postsOrder: numbers,
    },
    { deep: true }
  );

  //   const goNext = $(() => {
  //     position.value = -(298 + 2 * MARGIN);
  //   });

  //   const goPrev = $(() => {
  //     position.value = 298 + 2 * MARGIN;
  //   });

  //   useTask$(({ track }) => {
  //     track(direction);
  //     if (direction.value === "next") {
  //       goNext();

  //       return () => {
  //         if (goNextRequestRef.value !== null) {
  //           cancelAnimationFrame(goNextRequestRef.value);
  //           position.value = 0;
  //           direction.value = null;
  //         }
  //       };
  //     }

  //     if (direction.value === "prev") {
  //       goPrev();
  //       return () => {
  //         if (goPrevRequestRef.value !== null) {
  //           cancelAnimationFrame(goPrevRequestRef.value);
  //           position.value = 0;
  //           direction.value = null;
  //         }
  //       };
  //     }
  //   });

  useVisibleTask$(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth < 992) {
      carouselWidth.value = props.posts.length * (298 + 2 * MARGIN);
      margin.value = MARGIN;
      store.translateValues = getTranslateValues(
        store.postsOrder,
        margin.value
      );
    }
  });

  const handleNext = $(() => {
    direction.value = "next";
    // position.value = -(298 + 2 * MARGIN);
  });

  const handlePrev = $(() => {
    direction.value = "prev";
    // position.value = 298 + 2 * MARGIN;
  });

  const handleTransitionEnd: QRL<HandleTransitionType> = $(() => {
    if (direction.value === "next") {
      //   position.value = 0;
      const firstItem = store.postsOrder.shift();
      if (typeof firstItem === "number") {
        store.postsOrder.push(firstItem);
      }
      //   goNextRequestRef.value = requestAnimationFrame(() => {
      //     goNext();
      //   });
    }
    if (direction.value === "prev") {
      //   position.value = 0;
      const lastItem = store.postsOrder.pop();
      if (typeof lastItem === "number") {
        store.postsOrder.unshift(lastItem);
      }
      //   goPrevRequestRef.value = requestAnimationFrame(() => {
      //     goPrev();
      //   });
    }
    // console.log("position value:", position.value);
    // position.value = 0;
    direction.value = null;
  });

  const ulStyle = () => {
    return {
      width: carouselWidth.value,
      //   transform: `translate3d(${298 + 2 * margin.value}px, 0, 0)`,
    };
  };

  const liStyle = (index: number) => {
    return {
      transform: `translate3d(${store.translateValues[index]}px, 0, 0)`,
      //   marginLeft: margin.value,
      //   marginRight: margin.value,
    };
  };

  return (
    <WidgetContainer title={props.title}>
      {props.posts.length && (
        <>
          <div class="carousel-posts-container">
            <ul
              class={`carousel-posts-list${
                direction.value !== null ? " move-" + direction.value : ""
              }`}
              ref={ulRef}
              style={ulStyle()}
              onTransitionEnd$={(ev, el) => handleTransitionEnd(ev, el)}
            >
              {store.postsOrder.map((num, index) => {
                return (
                  <li key={`carousel-post-${uuidv4()}`} style={liStyle(index)}>
                    <div class="carousel-post-thumbnail">
                      <a href={props.posts[num].url}>
                        <div class="carousel-post-thumbnail-inner">
                          <img
                            src={props.posts[num].thumbnail}
                            alt={props.posts[num].title}
                          />
                        </div>
                      </a>
                    </div>
                    <div class="carousel-post-details">
                      <a href={props.posts[num].url}>
                        <h6 class="carousel-post-title">
                          {props.posts[num].title}
                        </h6>
                      </a>
                      <ul class="carousel-post-meta">
                        <li>
                          <a href={props.posts[num].authorUrl}>
                            {props.posts[num].author}
                          </a>
                        </li>
                        <li>{props.posts[num].date}</li>
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
