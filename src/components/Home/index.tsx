import {
  component$,
  useContextProvider,
  useSignal,
  useStore,
  useStyles$,
  useVisibleTask$,
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
  prevIndex: number;
  currentIndex: number;
  nextIndex: number;
  slickSliderPrevIndex: number;
  slickSliderCurrentIndex: number;
  slickSliderNextIndex: number;
  captionPrevIndex: number;
  captionCurrentIndex: number;
  captionNextIndex: number;
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
      //   nextIndex: 1,
      slickSliderPrevIndex: 0,
      slickSliderCurrentIndex: 1,
      slickSliderNextIndex: 2,
      captionCurrentIndex: 0,
      //   captionNextIndex: 1,
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
      get prevIndex() {
        if (typeof this === "function") {
          return 0;
        }
        return this.currentIndex === 0
          ? this.slides.length - 1
          : this.currentIndex - 1;
      },
      get nextIndex() {
        if (typeof this === "function") {
          return 0;
        }
        return this.currentIndex === this.slides.length - 1
          ? 0
          : this.currentIndex + 1;
      },
      get captionPrevIndex() {
        if (typeof this === "function") {
          return 0;
        }
        return this.captionCurrentIndex === 0
          ? this.slides.length - 1
          : this.captionCurrentIndex - 1;
      },
      set captionPrevIndex(value) {
        if (typeof this === "object") {
          this.captionPrevIndex = value;
        }
      },
      get captionNextIndex() {
        if (typeof this === "function") {
          return 0;
        }
        const nextIndexx =
          this.captionCurrentIndex === this.slides.length - 1
            ? 0
            : this.captionCurrentIndex + 1;

        return nextIndexx;
      },
      set captionNextIndex(value) {
        if (typeof this === "object") {
          this.captionNextIndex = value;
        }
      },
    },
    { deep: true }
  );

  //   useVisibleTask$(({ track }) => {
  //     track(() => store.captionCurrentIndex);
  //     console.log(store.captionCurrentIndex);
  //   });

  // prev and current Index
  //   useVisibleTask$(({ track }) => {
  //     track(() => store.currentIndex);
  //     store.prevIndex =
  //       store.currentIndex === 0
  //         ? store.slides.length - 1
  //         : store.currentIndex - 1;
  //     store.nextIndex =
  //       store.currentIndex === store.slides.length - 1
  //         ? 0
  //         : store.currentIndex + 1;
  //   });

  //slick slider prev and current index
  //   useVisibleTask$(({ track }) => {
  //     track(() => store.slickSliderCurrentIndex);
  //     store.slickSliderPrevIndex =
  //       store.slickSliderCurrentIndex === 0
  //         ? store.slides.length - 1
  //         : store.slickSliderCurrentIndex - 1;
  //     store.slickSliderNextIndex =
  //       store.slickSliderCurrentIndex === store.slides.length - 1
  //         ? 0
  //         : store.slickSliderCurrentIndex + 1;
  //   });

  // caption prev and next index
  const initialized = useSignal<boolean>(false);
  useVisibleTask$(({ track }) => {
    track(() => store.captionCurrentIndex);
    if (initialized.value === false) {
      initialized.value = true;
      return;
    }
    // console.log("caption prevIndex: ", store.captionPrevIndex);
    store.captionPrevIndex =
      store.captionCurrentIndex === 0
        ? store.slides.length - 1
        : store.captionCurrentIndex - 1;
    store.captionNextIndex =
      store.captionCurrentIndex === store.slides.length - 1
        ? 0
        : store.captionCurrentIndex + 1;
  });

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
