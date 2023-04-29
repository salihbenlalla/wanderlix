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
import { type Slide } from "./Hero/HeroContent/SlickSlider";
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
  generalIndex: number;
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
      direction: "next",
      generalIndex: 0,
      currentIndex: 0,
      slickSliderCurrentIndex: 1,
      slides: [
        {
          title: "Europe",
          thumbnail: "/images/place1.jpg",
          description:
            "Discover Europe's charm with our expert travel guides. Get inspired for your next adventure!",
        },
        {
          title: "Asia",
          thumbnail: "/images/place2.jpg",
          description:
            "Explore Asia's hidden gems with our travel guides to its temples, culture, and scenery. Start your journey today!",
        },
        {
          title: "Africa",
          thumbnail: "/images/place3.jpg",
          description:
            "Embark on an unforgettable adventure with our travel guides to Africa's wildlife, landscapes, and history. Get inspired and start exploring now!",
        },
        {
          title: "North America",
          thumbnail: "/images/place4.jpg",
          description:
            "Find your next adventure with our travel guides to North America's cities, wonders, and history. Be amazed by the beauty of this diverse continent and start planning your trip today!",
        },
        {
          title: "South America",
          thumbnail: "/images/place5.jpg",
          description:
            "Experience the vibrancy of South America with our travel guides to its landscapes, culture, and history. Start planning your trip today and get inspired for your journey ahead!",
        },
        {
          title: "Australia",
          thumbnail: "/images/place6.jpg",
          description:
            "Discover Australia's iconic landmarks, beaches, and wildlife with our travel guides. Let us inspire and guide you on your journey Down Under, from the Outback to the Great Barrier Reef!",
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
