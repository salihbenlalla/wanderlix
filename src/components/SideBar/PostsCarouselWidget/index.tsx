import {
  $,
  component$,
  useSignal,
  useStore,
  useStyles$,
  useVisibleTask$,
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
}

declare global {
  interface Window {
    timer?: ReturnType<typeof window.setTimeout>;
  }
}

export const getTranslateValues = (
  numberOfPosts: number,
  margin: number = 0,
  itemWidth: number
) => {
  const halfOfPosts = Math.floor(numberOfPosts / 2);
  const numbers = Array.from({ length: numberOfPosts }, (_, i) => i);
  return numbers.map((num, index) => {
    if (index >= halfOfPosts) {
      return (itemWidth + margin * 2) * (index - halfOfPosts);
    } else {
      return -(itemWidth + margin * 2) * (halfOfPosts - index);
    }
  });
};

export default component$<PostsCarouselWidgetProps>((props) => {
  useStyles$(styles);
  const MARGIN = 10;
  const ITEMWIDTH = 298;
  const direction = useSignal<"prev" | "next" | null>(null);
  const margin = useSignal(0);

  const store = useStore<Store>(
    {
      translateValues: getTranslateValues(
        props.posts.length,
        margin.value,
        ITEMWIDTH
      ),
    },
    { deep: true }
  );

  useVisibleTask$(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth < 992) {
      margin.value = MARGIN;
      store.translateValues = getTranslateValues(
        props.posts.length,
        margin.value,
        ITEMWIDTH
      );
    }
  });

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

  return (
    <WidgetContainer title={props.title}>
      {props.posts.length && (
        <>
          <div class="carousel-posts-container">
            <ul class={`carousel-posts-list`}>
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
                    itemWidth={ITEMWIDTH + 2 * MARGIN}
                  />
                );
              })}
            </ul>
          </div>
          <div class="carousel-arrows">
            <button
              class="carousel-arrow-left"
              onClick$={handlePrev}
              aria-label="Previous Slide"
            >
              <CheveronLeft />
            </button>
            <button
              class="carousel-arrow-right"
              onClick$={handleNext}
              aria-label="Next Slide"
            >
              <CheveronRight />
            </button>
          </div>
        </>
      )}
    </WidgetContainer>
  );
});
