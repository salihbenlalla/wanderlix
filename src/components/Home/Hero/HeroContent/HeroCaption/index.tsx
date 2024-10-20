import {
  component$,
  useContext,
  useSignal,
  useStyles$,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import styles from "./style.css?inline";
import { homeContext } from "~/components/Home/HomeContext";
import { Link } from "@salihbenlalla/qwik-city";
import { slideDown, slideUp } from "./slideHandlers";
import { changeIndex } from "./changeIndex";

declare global {
  interface ChildNode {
    clientHeight: number;
  }
}

export default component$(() => {
  useStyles$(styles);

  const homeContextStore = useContext(homeContext);

  useTask$(() => {
    homeContextStore.captionPrevIndex =
      homeContextStore.captionCurrentIndex === 0
        ? homeContextStore.slides.length - 1
        : homeContextStore.captionCurrentIndex - 1;
    homeContextStore.captionNextIndex =
      homeContextStore.captionCurrentIndex ===
        homeContextStore.slides.length - 1
        ? 0
        : homeContextStore.captionCurrentIndex + 1;
  })

  const titlePlaceholder = useSignal(homeContextStore.slides[homeContextStore.captionCurrentIndex].title);
  const paragraphPlaceholder = useSignal(homeContextStore.slides[homeContextStore.captionCurrentIndex].description);
  const buttonPlaceholder = useSignal(homeContextStore.slides[homeContextStore.captionCurrentIndex].url);
  const transitioning = useSignal(false);
  //to adjust the size of the paragraph under the title
  const paragraphRef = useSignal<HTMLDivElement>();
  const titleRef = useSignal<HTMLHeadingElement>();
  const buttonRef = useSignal<HTMLHeadingElement>();

  // const title1 = useSignal(homeContextStore.slides[homeContextStore.captionPrevIndex].title)
  // const title2 = useSignal(homeContextStore.slides[homeContextStore.captionCurrentIndex].title)
  // const title3 = useSignal(homeContextStore.slides[homeContextStore.captionNextIndex].title)

  // eslint-disable-next-line qwik/no-use-visible-task
  // useVisibleTask$(() => {
  //   const childNodes = paragraphRef.value?.childNodes;
  //   let maxHeight = 0;
  //   childNodes?.forEach((childNode) => {
  //     const childHeight = childNode.clientHeight;
  //     if (childHeight > maxHeight) {
  //       maxHeight = childHeight;
  //     }
  //   });
  //   if (paragraphRef.value) {
  //     paragraphRef.value.style.height = `${maxHeight}px`;
  //   }
  // });

  const initialized = useSignal(false);
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async ({ track }) => {
    track(() => homeContextStore.slickSliderCurrentIndex);

    if (initialized.value === false) {
      initialized.value = true;
      return;
    }

    if (homeContextStore.direction === "next") {
      await Promise.all([
        slideUp(titleRef, titlePlaceholder, transitioning, homeContextStore, "title"),
        slideUp(paragraphRef, paragraphPlaceholder, transitioning, homeContextStore, "description"),
        slideUp(buttonRef, buttonPlaceholder, transitioning, homeContextStore, "url")
      ])

      changeIndex(homeContextStore);
    }

    if (homeContextStore.direction === "prev") {
      await Promise.all([
        slideDown(titleRef, paragraphPlaceholder, transitioning, homeContextStore, "title"),
        slideDown(paragraphRef, paragraphPlaceholder, transitioning, homeContextStore, "description"),
        slideDown(buttonRef, buttonPlaceholder, transitioning, homeContextStore, "url")
      ])

      changeIndex(homeContextStore);
    }

  });

  return (
    <div class="hero-caption">
      <h1 class="title-container">
        <div ref={titleRef} class="title-inner">
          <div
          >
            {transitioning.value ? titlePlaceholder.value : homeContextStore.slides[homeContextStore.captionPrevIndex].title}
          </div>
          <div
          >
            {transitioning.value ? titlePlaceholder.value : homeContextStore.slides[homeContextStore.captionCurrentIndex].title}
          </div>
          <div
          >
            {transitioning.value ? titlePlaceholder.value : homeContextStore.slides[homeContextStore.captionNextIndex].title}
          </div>
        </div>
      </h1>

      <div class="hero-caption-paragraph-container">
        <div ref={paragraphRef} class="hero-caption-paragraph">
          <div
          >
            {
              transitioning.value ? paragraphPlaceholder.value : homeContextStore.slides[homeContextStore.captionPrevIndex]
                .description
            }
          </div>
          <div
          >
            {
              transitioning.value ? paragraphPlaceholder.value : homeContextStore.slides[homeContextStore.captionCurrentIndex]
                .description
            }
          </div>
          <div
          >
            {
              transitioning.value ? paragraphPlaceholder.value : homeContextStore.slides[homeContextStore.captionNextIndex]
                .description
            }
          </div>
        </div>
      </div>

      <div class="hero-caption-button-container">
        <div ref={buttonRef} class="hero-caption-button-inner">
          <Link
            href={transitioning.value ? buttonPlaceholder.value : homeContextStore.slides[homeContextStore.captionPrevIndex].url}
          >
            DISCOVER LOCATION
          </Link>

          <Link
            href={transitioning.value ? buttonPlaceholder.value : homeContextStore.slides[homeContextStore.captionCurrentIndex].url}
          >
            DISCOVER LOCATION
          </Link>

          <Link
            href={transitioning.value ? buttonPlaceholder.value : homeContextStore.slides[homeContextStore.captionNextIndex].url}
          >
            DISCOVER LOCATION
          </Link>
        </div>

        {/* <span class="button-arrow">&rarr;</span> */}
      </div>
    </div>
  );
});
