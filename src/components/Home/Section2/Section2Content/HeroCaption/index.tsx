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

  //to adjust the size of the paragraph under the title
  const paragraphRef = useSignal<HTMLDivElement>();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
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
  });

  const initialized = useSignal(false);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(() => homeContextStore.slickSliderCurrentIndex);

    if (initialized.value === false) {
      initialized.value = true;
      return;
    }

    if (homeContextStore.direction === "next") {
      //go to next index
      homeContextStore.captionCurrentIndex =
        homeContextStore.captionCurrentIndex ===
          homeContextStore.slides.length - 1
          ? 0
          : homeContextStore.captionCurrentIndex + 1;

      // reposition slides
      store.h1 = store.h1.map((value) => {
        if (value === -120) return 120;
        if (value === 0) return -120;
        if (value === 120) return 0;
        return 0;
      });
    }

    if (homeContextStore.direction === "prev") {
      //go to previous index
      homeContextStore.captionCurrentIndex =
        homeContextStore.captionCurrentIndex === 0
          ? homeContextStore.slides.length - 1
          : homeContextStore.captionCurrentIndex - 1;

      // reposition slides
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

  const calculateIndex = (index: number) => {
    if (store.h1[index] === -120) return homeContextStore.captionPrevIndex;
    if (store.h1[index] === 120) return homeContextStore.captionNextIndex;
    return homeContextStore.captionCurrentIndex;
  };

  return (
    <div class="section2-caption">
      <h1>
        <div
          class="section2-caption-moving-element"
          style={{ top: `${store.h1[0]}%`, ...extraStyles(store.h1[0]) }}
        >
          {homeContextStore.slides[calculateIndex(0)].title}
        </div>
        <div
          class="section2-caption-moving-element"
          style={{ top: `${store.h1[1]}%`, ...extraStyles(store.h1[1]) }}
        >
          {homeContextStore.slides[calculateIndex(1)].title}
        </div>
        <div
          class="section2-caption-moving-element"
          style={{ top: `${store.h1[2]}%`, ...extraStyles(store.h1[2]) }}
        >
          {homeContextStore.slides[calculateIndex(2)].title}
        </div>
      </h1>

      <div ref={paragraphRef} class="section2-caption-paragraph">
        <div
          class="section2-caption-moving-element"
          style={{ top: `${store.h1[0]}%`, ...extraStyles(store.h1[0]) }}
        >
          {
            homeContextStore.slides[homeContextStore.captionPrevIndex]
              .description
          }
        </div>
        <div
          class="section2-caption-moving-element"
          style={{ top: `${store.h1[1]}%`, ...extraStyles(store.h1[1]) }}
        >
          {
            homeContextStore.slides[homeContextStore.captionCurrentIndex]
              .description
          }
        </div>
        <div
          class="section2-caption-moving-element"
          style={{ top: `${store.h1[2]}%`, ...extraStyles(store.h1[2]) }}
        >
          {
            homeContextStore.slides[homeContextStore.captionNextIndex]
              .description
          }
        </div>
      </div>

      <div class="section2-caption-button-container">
        <button
          class="section2-caption-moving-element"
          style={{ top: `${store.h1[0]}%`, ...extraStyles(store.h1[0]) }}
        >
          DISCOVER LOCATION
          {/* <span class="button-arrow">&rarr;</span> */}
        </button>
        <button
          class="section2-caption-moving-element"
          style={{ top: `${store.h1[1]}%`, ...extraStyles(store.h1[1]) }}
        >
          DISCOVER LOCATION
          {/* <span class="button-arrow">&rarr;</span> */}
        </button>
        <button
          class="section2-caption-moving-element"
          style={{ top: `${store.h1[2]}%`, ...extraStyles(store.h1[2]) }}
        >
          DISCOVER LOCATION
          {/* <span class="button-arrow">&rarr;</span> */}
        </button>
      </div>
    </div>
  );
});
