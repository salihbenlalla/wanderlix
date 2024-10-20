import {
  component$,
  useContextProvider,
  useSignal,
  useStore,
  useStyles$,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Hero from "./Hero";
import { type Slide } from "./Hero/HeroContent/SlickSlider";
import { homeContext } from "./HomeContext";
import styles from "./index.css?inline";

declare global {
  interface Window {
    scrollTimeout: NodeJS.Timeout;
    generalIndexTimeout: NodeJS.Timeout;
  }
}

export interface HomeContextStore {
  generalIndex: number;
  prevIndex: number;
  currentIndex: number;
  nextIndex: number;
  slickSliderPrevIndex: number;
  slickSliderCurrentIndex: number;
  slickSliderNextIndex: number;
  captionPrevIndex: number;
  _captionPrevIndex: number;
  captionCurrentIndex: number;
  _captionCurrentIndex: number;
  captionNextIndex: number;
  _captionNextIndex: number;
  currentSectionIndex: number;
  slides: Slide[];
  direction: "next" | "prev" | undefined;
}

export default component$(() => {
  useStyles$(styles);
  const store = useStore<HomeContextStore>(
    {
      direction: "next",
      generalIndex: 0,
      currentIndex: 0,
      slickSliderPrevIndex: 0,
      slickSliderCurrentIndex: 1,
      slickSliderNextIndex: 2,
      _captionCurrentIndex: 0,
      _captionPrevIndex: 0,
      _captionNextIndex: 0,
      currentSectionIndex: 0,
      slides: [
        {
          title: "Europe",
          url: "/destinations/#europe",
          thumbnail: "/images/1280/705/in-which-district-loger-cork.webp",
          description:
            "Discover Europe's charm with our expert travel guides. Get inspired for your next adventure! your journey today!",
        },
        {
          title: "Asia",
          url: "/destinations/#asia",
          thumbnail:
            "/images/1280/855/visit-the-connemara-in-irish-tickets-hourly-rates.webp",
          description:
            "Explore Asia's hidden gems with our travel guides to its temples, culture, and scenery. Start your journey today!",
        },
        {
          title: "Africa",
          url: "/destinations/#africa",
          thumbnail:
            "/images/1280/854/the-bay-of-boyeeghter-or-irish-in-all-its-splendor.webp",
          description:
            "Embark on an unforgettable adventure with our travel guides to Africa's wildlife, landscapes, and history. Get !",
        },
        {
          title: "North America",
          url: "/destinations/#north_america",
          thumbnail:
            "/images/1280/853/visit-the-kerry-ring-from-cork-rservations-rates.webp",
          description:
            "Find your next adventure with our travel guides to North America's cities, wonders, and history. Be amazed by t!",
        },
        {
          title: "South America",
          url: "/destinations/#south_america",
          thumbnail:
            "/images/1280/835/visit-the-count-of-wicklow-rservations-rates.webp",
          description:
            "Experience the vibrancy of South America with our travel guides to its landscapes, culture, and history. Start y!",
        },
        {
          title: "Australia",
          url: "/destinations/#australia",
          thumbnail: "/images/1280/675/in-which-area-loger-auckland.webp",
          description:
            "Discover Australia's iconic landmarks, beaches, and wildlife with our travel guides. Let us inspire and guide yo!",
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
      //TODO: write a setter function for the captionCurrnetIndex, so that whenever the captionCurrentIndex updates, it also updates the captionPrevIndex and the captionNextIndex
      set captionCurrentIndex(value: number) {
        if (typeof this === "object") {
          this._captionCurrentIndex = value;
          this._captionPrevIndex = value === 0
            ? this.slides.length - 1
            : value - 1;
          this._captionNextIndex = value === this.slides.length - 1
            ? 0
            : value + 1;
        }
      },
      get captionCurrentIndex() {
        if (typeof this === "function") {
          return 0;
        }
        return this._captionCurrentIndex;
      },
      get captionPrevIndex() {
        if (typeof this === "function") {
          return 0;
        }
        return this._captionPrevIndex;
      },
      set captionPrevIndex(value) {
        if (typeof this === "object") {
          this._captionPrevIndex = value;
        }
      },
      get captionNextIndex() {
        if (typeof this === "function") {
          return 0;
        }
        return this._captionNextIndex;
      },
      set captionNextIndex(value) {
        if (typeof this === "object") {
          this._captionNextIndex = value;
        }
      },
    },
    { deep: true }
  );

  console.log("form homecontextstore: ", store.captionNextIndex)

  const homeContainerRef = useSignal<HTMLDivElement>();

  const section1Ref = useSignal<HTMLDivElement>();
  const sectionHeight = useSignal<number | string>("calc(100vh - 80px)");

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    sectionHeight.value = `${document.documentElement.clientHeight - 80}px`;
  });

  useContextProvider(homeContext, store);
  return (
    <>
      <div
        ref={homeContainerRef}
        class="home-container"
      >
        <div
          ref={section1Ref}
          class="home-section"
          id="home-section-1"
          style={{ height: sectionHeight.value }}
        >
          <Hero />
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Home",
};
