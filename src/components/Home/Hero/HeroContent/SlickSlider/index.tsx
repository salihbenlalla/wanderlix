import {
  $,
  component$,
  useSignal,
  useStore,
  useStyles$,
  useTask$,
  useVisibleTask$,
  // useVisibleTask$,
} from "@builder.io/qwik";
import { v4 as uuidv4 } from "uuid";
import styles from "./style.css?inline";
import CheveronRight from "~/assets/icomoon_svg/cheveron-right.svg?component";
import CheveronLeft from "~/assets/icomoon_svg/cheveron-left.svg?component";
import CarouselItem from "./CarouselItem";
import { isBrowser } from "@builder.io/qwik/build";

export interface CarouselPost {
  title: string;
  thumbnail?: string;
  date?: string;
  url: string;
  author?: string;
  authorUrl?: string;
}

export interface HomeCarouselProps {
  posts: CarouselPost[];
  currentIndex: number;
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

export default component$<HomeCarouselProps>((props) => {
  useStyles$(styles);
  const MARGIN = 10;
  const ITEMWIDTH = 150;
  const direction = useSignal<"prev" | "next" | null>(null);

  const store = useStore<Store>(
    {
      translateValues: getTranslateValues(
        props.posts.length,
        MARGIN,
        ITEMWIDTH
      ),
    },
    { deep: true }
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


  useVisibleTask$(({ track }) => {
      track(() => props.currentIndex);
        
      const translateValues = store.translateValues.map(value => value)

      let index = store.translateValues.find((value, index) => {
        if (value === 0) return index;
      })?? Math.floor(props.posts.length / 2)

      while (index !== props.currentIndex) {
        console.log("from slick slider useVisibleTask$: ", props.currentIndex);
        handleNext()
        index = index + 1 === props.posts.length ? 0 : index + 1;
      }
      store.translateValues = translateValues

        if (isBrowser) {
          
        }
    });

  

  return (
    <div class="hero-slick-slider">
      {props.posts.length && (
        <>
          <div class="hero-slick-slider-posts-container">
            <ul class={`hero-slick-slider-posts-list`}>
              {props.posts.map((post, index) => {
                return (
                  <CarouselItem
                    key={`slick-slider-post-${uuidv4()}`}
                    title={post.title}
                    thumbnail={post.thumbnail}
                    // date={post.date}
                    url={post.url}
                    // author={post.author}
                    // authorUrl={post.authorUrl}
                    translateValue={store.translateValues[index]}
                    direction={direction.value}
                    itemWidth={ITEMWIDTH + 2 * MARGIN}
                  />
                );
              })}
            </ul>
          </div>
          <div class="hero-slick-slider-arrows">
            <button class="hero-slick-slider-arrow-left" onClick$={handlePrev}>
              <CheveronLeft />
            </button>
            <button class="hero-slick-slider-arrow-right" onClick$={handleNext}>
              <CheveronRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
});
