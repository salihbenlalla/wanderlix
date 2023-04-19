import {
  component$,
  useContextProvider,
  //   useSignal,
  useStore,
  useStyles$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
// import HomeCarousel, { type HomeCarouselProps } from "./HomeCarousel";
import Hero from "./Hero";
import { type Slide } from "./Hero/HeroContent/SlickSlider2";
import { homeContext } from "./HomeContext";
import styles from "./index.css?inline";

// const postsCarousel: HomeCarouselProps = {
//   posts: [
//     {
//       title: "Post 0",
//       url: "#",
//       thumbnail: "/images/place1.jpg",
//       date: "26 August 2022",
//       author: "John Doe",
//       authorUrl: "#",
//     },
//     {
//       title: "Post 1",
//       url: "#",
//       thumbnail: "/images/place2.jpg",
//       date: "23 August 2022",
//       author: "John Smith",
//       authorUrl: "#",
//     },
//     {
//       title: "Post 2",
//       url: "#",
//       thumbnail: "/images/place3.jpg",
//       date: "23 August 2022",
//       author: "matilda Smith",
//       authorUrl: "#",
//     },
//     {
//       title: "Post 3",
//       url: "#",
//       thumbnail: "/images/place4.jpg",
//       date: "23 August 2022",
//       author: "John Smith",
//       authorUrl: "#",
//     },
//     {
//       title: "Post 4",
//       url: "#",
//       thumbnail: "/images/place5.jpg",
//       date: "23 August 2022",
//       author: "John Smith",
//       authorUrl: "#",
//     },
//     {
//       title: "Post 4",
//       url: "#",
//       thumbnail: "/images/place6.jpg",
//       date: "23 August 2022",
//       author: "John Smith",
//       authorUrl: "#",
//     },
//   ],
// };

// const images = [
//   "/images/place1.jpg",
//   "/images/place2.jpg",
//   "/images/place3.jpg",
//   "/images/place4.jpg",
//   "/images/place5.jpg",
//   "/images/place6.jpg",
// ];

export interface HomeContextStore {
  currentIndex: number;
  slickSliderCurrentIndex: number;
  slides: Slide[];
  direction: "next" | "prev" | undefined;
}

export default component$(() => {
  useStyles$(styles);
  // const heroCurrentIndex = useSignal(0);
  const store = useStore<HomeContextStore>(
    {
      direction: undefined,
      currentIndex: 0,
      slickSliderCurrentIndex: 0,
      slides: [
        {
          title: "Post 0",
          thumbnail: "/images/place1.jpg",
          description: "this is a description",
        },
        {
          title: "Post 1",
          thumbnail: "/images/place2.jpg",
          description: "this is a description",
        },
        {
          title: "Post 2",
          thumbnail: "/images/place3.jpg",
          description: "this is a description",
        },
        {
          title: "Post 3",
          thumbnail: "/images/place4.jpg",
          description: "this is a description",
        },
        {
          title: "Post 4",
          thumbnail: "/images/place5.jpg",
          description: "this is a description",
        },
        {
          title: "Post 5",
          thumbnail: "/images/place6.jpg",
          description: "this is a description",
        },
      ],
    },
    { deep: true }
  );

  useContextProvider(homeContext, store);
  return (
    <>
      <div>
        <Hero />
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Home",
};
