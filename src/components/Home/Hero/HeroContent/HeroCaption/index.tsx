import {
  component$,
  useContext,
  useSignal,
  useStore,
  useStyles$,
  useVisibleTask$,
} from "@builder.io/qwik";
import styles from "./style.css?inline";
import { homeContext } from "~/components/Home/HomeContext";

declare global {
  interface ChildNode {
    clientHeight: number;
  }
}

export default component$(() => {
  useStyles$(styles);

  const homeContextStore = useContext(homeContext);
  const store = useStore(
    {
      h1: [-120, 0, 120],
    },
    { deep: true }
  );

  const paragraphRef = useSignal<HTMLDivElement>();

  useVisibleTask$(({ track }) => {
    track(() => homeContextStore.slickSliderCurrentIndex);

    const childNodes = paragraphRef.value?.childNodes;
    let maxHeight = 0;
    childNodes?.forEach((childNode) => {
      const childHeight = childNode.clientHeight;
      if (childHeight > maxHeight) {
        maxHeight = childHeight;
      }
    });
    if (paragraphRef.value) {
      paragraphRef.value.style.height = `${maxHeight}px`;
    }

    if (homeContextStore.direction === "next") {
      store.h1 = store.h1.map((value) => {
        if (value === -120) return 120;
        if (value === 0) return -120;
        if (value === 120) return 0;
        return 0;
      });
    }

    if (homeContextStore.direction === "prev") {
      store.h1 = store.h1.map((value) => {
        if (value === 120) return -120;
        if (value === 0) return 120;
        if (value === -120) return 0;
        return 0;
      });
    }
  });

  const extraStyles = (topValue: number) => {
    if (homeContextStore.direction === "next") {
      return { opacity: topValue === 120 ? 0 : 1 };
    }
    if (homeContextStore.direction === "prev") {
      return { opacity: topValue === -120 ? 0 : 1 };
    }
  };

  return (
    <div class="hero-caption">
      <h1>
        <div
          class="hero-caption-moving-element"
          style={{ top: `${store.h1[0]}%`, ...extraStyles(store.h1[0]) }}
        >
          {homeContextStore.slides[homeContextStore.captionPrevIndex].title}
        </div>
        <div
          class="hero-caption-moving-element"
          style={{ top: `${store.h1[1]}%`, ...extraStyles(store.h1[1]) }}
        >
          {homeContextStore.slides[homeContextStore.captionCurrentIndex].title}
        </div>
        <div
          class="hero-caption-moving-element"
          style={{ top: `${store.h1[2]}%`, ...extraStyles(store.h1[2]) }}
        >
          {homeContextStore.slides[homeContextStore.captionNextIndex].title}
        </div>
      </h1>

      <div ref={paragraphRef} class="hero-caption-paragraph">
        <div
          class="hero-caption-moving-element"
          style={{ top: `${store.h1[0]}%`, ...extraStyles(store.h1[0]) }}
        >
          {
            homeContextStore.slides[homeContextStore.captionPrevIndex]
              .description
          }
        </div>
        <div
          class="hero-caption-moving-element"
          style={{ top: `${store.h1[1]}%`, ...extraStyles(store.h1[1]) }}
        >
          {
            homeContextStore.slides[homeContextStore.captionCurrentIndex]
              .description
          }
        </div>
        <div
          class="hero-caption-moving-element"
          style={{ top: `${store.h1[2]}%`, ...extraStyles(store.h1[2]) }}
        >
          {
            homeContextStore.slides[homeContextStore.captionNextIndex]
              .description
          }
        </div>
      </div>

      <div class="hero-caption-button-container">
        <button
          class="hero-caption-moving-element"
          style={{ top: `${store.h1[0]}%`, ...extraStyles(store.h1[0]) }}
        >
          DISCOVER LOCATION
          {/* <span class="button-arrow">&rarr;</span> */}
        </button>
        <button
          class="hero-caption-moving-element"
          style={{ top: `${store.h1[1]}%`, ...extraStyles(store.h1[1]) }}
        >
          DISCOVER LOCATION
          {/* <span class="button-arrow">&rarr;</span> */}
        </button>
        <button
          class="hero-caption-moving-element"
          style={{ top: `${store.h1[2]}%`, ...extraStyles(store.h1[2]) }}
        >
          DISCOVER LOCATION
          {/* <span class="button-arrow">&rarr;</span> */}
        </button>
      </div>
    </div>
  );
});
