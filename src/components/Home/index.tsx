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
import jump from "jump.js";
import { areAllDefined } from "~/lib/helpers/areAllDefined";
import Section2 from "./Section2";

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
  captionCurrentIndex: number;
  captionNextIndex: number;
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
      captionCurrentIndex: 0,
      currentSectionIndex: 0,
      slides: [
        {
          title: "Europe",
          thumbnail: "/images/1280/705/in-which-district-loger-cork.webp",
          description:
            "Discover Europe's charm with our expert travel guides. Get inspired for your next adventure! your journey today!",
        },
        {
          title: "Asia",
          thumbnail:
            "/images/1280/855/visit-the-connemara-in-irish-tickets-hourly-rates.webp",
          description:
            "Explore Asia's hidden gems with our travel guides to its temples, culture, and scenery. Start your journey today!",
        },
        {
          title: "Africa",
          thumbnail:
            "/images/1280/854/the-bay-of-boyeeghter-or-irish-in-all-its-splendor.webp",
          description:
            "Embark on an unforgettable adventure with our travel guides to Africa's wildlife, landscapes, and history. Get !",
        },
        {
          title: "North America",
          thumbnail:
            "/images/1280/853/visit-the-kerry-ring-from-cork-rservations-rates.webp",
          description:
            "Find your next adventure with our travel guides to North America's cities, wonders, and history. Be amazed by t!",
        },
        {
          title: "South America",
          thumbnail:
            "/images/1280/835/visit-the-count-of-wicklow-rservations-rates.webp",
          description:
            "Experience the vibrancy of South America with our travel guides to its landscapes, culture, and history. Start y!",
        },
        {
          title: "Australia",
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

  const homeContainerRef = useSignal<HTMLDivElement>();

  const section1Ref = useSignal<HTMLDivElement>();
  const section2Ref = useSignal<HTMLDivElement>();
  const section3Ref = useSignal<HTMLDivElement>();
  const section4Ref = useSignal<HTMLDivElement>();
  const section5Ref = useSignal<HTMLDivElement>();

  const isScrolling = useSignal(false);

  const lastTouchY = useSignal<number | undefined>(undefined);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const handleScroll = (direction: 1 | -1) => {
      const sections = [
        section1Ref.value,
        section2Ref.value,
        section3Ref.value,
        section4Ref.value,
        section5Ref.value,
      ];
      if (areAllDefined(sections)) {
        if (
          direction === 1 &&
          store.currentSectionIndex < sections.length - 1
        ) {
          store.currentSectionIndex++;
          const element = sections[store.currentSectionIndex];

          //@ts-ignore
          clearTimeout(window.scrollAnimationTimeout1);
          //@ts-ignore
          window.scrollAnimationTimeout1 = setTimeout(
            () => jump(element, { duration: 1000, offset: -80 }),
            300
          );
        } else if (direction === -1 && store.currentSectionIndex > 0) {
          store.currentSectionIndex--;
          const element = sections[store.currentSectionIndex];

          jump(element, { duration: 1000, offset: -80 });
        }
      }
    };
    const scrollHandler = (direction: 1 | -1) => {
      if (!isScrolling.value) {
        handleScroll(direction);
        // if user just started scrolling
        isScrolling.value = true;
        // Allow new scroll only after animation ends
        clearTimeout(window.scrollTimeout);
        // wait for 1000/1300 milliseconds after last scroll event to consider scrolling has stopped
        const scrollDuration = direction === 1 ? 1300 : 1000;
        window.scrollTimeout = setTimeout(() => {
          isScrolling.value = false;
        }, scrollDuration);
      }
    };

    window.addEventListener(
      "wheel",
      (event) => {
        event.preventDefault();
        //   enableScroll();
        // event.preventDefault();
        const direction = event.deltaY > 0 ? 1 : -1;
        scrollHandler(direction);
      },
      { passive: false }
    );

    window.addEventListener(
      "keydown",
      (event) => {
        if (["ArrowDown", "Space", "PageDown", "End"].includes(event.code)) {
          event.preventDefault();
          scrollHandler(1);
          return false;
        }
        if (["ArrowUp", "PageUp", "Home"].includes(event.code)) {
          event.preventDefault();
          scrollHandler(-1);
          return false;
        }
      },
      { passive: false }
    );

    window.addEventListener("touchmove", (event) => {
      event.preventDefault();
      const touchY = event.touches[0].clientY;

      // Determine direction of touch move
      if (lastTouchY.value) {
        const deltaY = touchY - lastTouchY.value;
        if (deltaY > 0) {
          scrollHandler(1);
        } else if (deltaY < 0) {
          scrollHandler(-1);
        }
      }

      // Update last touch position
      lastTouchY.value = touchY;
    });
    //   return () => {
    //     window.removeEventListener("wheel", scrollHandler);
    //   };
  });

  //   useOnDocument(
  //     "wheel",
  //     $(() => {
  //       const handleScroll = () => {
  //         window.scrollBy({
  //           top: 1000,
  //           behavior: "smooth",
  //         });
  //         if (!isScrolling.value) {
  //           // if user just started scrolling
  //           isScrolling.value = true;
  //           if (store.section <= 5) {
  //             store.section++;
  //           }
  //         }

  //         // wait for 100 milliseconds after last scroll event to consider scrolling has stopped
  //         clearTimeout(window.scrollTimeout);
  //         window.scrollTimeout = setTimeout(function () {
  //           isScrolling.value = false;
  //         }, 100);
  //       };

  //       window.addEventListener("scroll", handleScroll);

  //       return () => {
  //         window.removeEventListener("scroll", handleScroll);
  //       };
  //     })
  //   );
  const initialized = useSignal<boolean>(false);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(() => store.captionCurrentIndex);
    if (initialized.value === false) {
      initialized.value = true;
      return;
    }

    store.captionPrevIndex =
      store.captionCurrentIndex === 0
        ? store.slides.length - 1
        : store.captionCurrentIndex - 1;
    store.captionNextIndex =
      store.captionCurrentIndex === store.slides.length - 1
        ? 0
        : store.captionCurrentIndex + 1;
  });

  const sectionHeight = useSignal<number | string>("calc(100vh - 80px)");

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    sectionHeight.value = `${document.documentElement.clientHeight - 80}px`;
  });

  useContextProvider(homeContext, store);
  return (
    <>
      {/* <div class="scroll-buttons">
        <button onClick$={() => handleScroll(-1)}>Prev</button>
        <button onClick$={() => handleScroll(1)}>Next</button>
      </div> */}
      <div
        ref={homeContainerRef}
        class="home-container"
      // style={{ height: sectionHeight.value }}
      >
        <div
          ref={section1Ref}
          class="home-section"
          id="home-section-1"
          style={{ height: sectionHeight.value }}
        >
          <Hero />
        </div>
        <div
          ref={section2Ref}
          class="home-section"
          id="home-section-2"
          style={{ height: sectionHeight.value }}
        >
          <Section2 />
        </div>
        <div
          ref={section3Ref}
          class="home-section"
          id="home-section-3"
          style={{ height: sectionHeight.value }}
        >
          <h1>Section 3</h1>
        </div>
        <div
          ref={section4Ref}
          class="home-section"
          id="home-section-4"
          style={{ height: sectionHeight.value }}
        >
          <h1>Section 4</h1>
        </div>
        <div
          ref={section5Ref}
          class="home-section"
          id="home-section-5"
          style={{ height: sectionHeight.value }}
        >
          <h1>Section 5</h1>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Home",
};
