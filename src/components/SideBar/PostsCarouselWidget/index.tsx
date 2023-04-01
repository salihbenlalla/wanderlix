import {
  $,
  component$,
  useSignal,
  useStore,
  useStyles$,
  useOnDocument,
} from "@builder.io/qwik";
import { v4 as uuidv4 } from "uuid";
import WidgetContainer from "../WidgetContainer";
import styles from "./style.css?inline";
import CheveronRight from "/src/assets/icomoon_svg/cheveron-right.svg?component";
import CheveronLeft from "/src/assets/icomoon_svg/cheveron-left.svg?component";
import CarouselItem from "./CarouselItem";

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
  //   postsOrder: number[];
}

// type SingleOrArray<T> = T | (SingleOrArray<T> | undefined | null)[];

// type HandleTransitionType =
//   | SingleOrArray<
//       (
//         event: QwikTransitionEvent<HTMLUListElement>,
//         element: HTMLUListElement
//       ) => any
//     >
//   | undefined;

declare global {
  interface Window {
    timer?: ReturnType<typeof window.setTimeout>;
  }
}

export const getTranslateValues = (
  numberOfPosts: number,
  margin: number = 0
) => {
  const halfOfPosts = Math.floor(numberOfPosts / 2);
  const numbers = Array.from({ length: numberOfPosts }, (_, i) => i);
  return numbers.map((num, index) => {
    if (index >= halfOfPosts) {
      return (298 + margin * 2) * (index - halfOfPosts);
    } else {
      return -(298 + margin * 2) * (halfOfPosts - index);
    }
  });
};

export default component$<PostsCarouselWidgetProps>((props) => {
  useStyles$(styles);
  const MARGIN = 0;
  const ulRef = useSignal<HTMLUListElement>();
  const direction = useSignal<"prev" | "next" | null>(null);
  const carouselWidth = useSignal<number>(props.posts.length * 298);
  const margin = useSignal(10);

  const store = useStore<Store>(
    {
      translateValues: getTranslateValues(props.posts.length, margin.value),
    },
    { deep: true }
  );

  useOnDocument(
    "load",
    $(() => {
      const windowWidth = window.innerWidth;
      if (windowWidth > 991) {
        carouselWidth.value = props.posts.length * (298 + 2 * MARGIN);
        margin.value = MARGIN;
        store.translateValues = getTranslateValues(
          props.posts.length,
          margin.value
        );
      }
    })
  );

  const handleNext = $(() => {
    direction.value = "next";

    const lastItem = store.translateValues.pop();
    if (typeof lastItem === "number") {
      store.translateValues.unshift(lastItem);
    }
  });

  const handlePrev = $(() => {
    direction.value = "prev";

    const firstItem = store.translateValues.shift();
    if (typeof firstItem === "number") {
      store.translateValues.push(firstItem);
    }
  });

  const ulStyle = () => {
    return {
      width: carouselWidth.value,
    };
  };

  return (
    <WidgetContainer title={props.title}>
      {props.posts.length && (
        <>
          <div class="carousel-posts-container">
            <ul class={`carousel-posts-list`} ref={ulRef} style={ulStyle()}>
              {props.posts.map((post, index) => {
                return (
                  <CarouselItem
                    key={`carousel-post-${uuidv4()}`}
                    title={post.title}
                    thumbnail={post.thumbnail}
                    date={post.date}
                    url={post.url}
                    author={post.author}
                    authorUrl={post.authorUrl}
                    translateValue={store.translateValues[index]}
                    direction={direction.value}
                  />
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
