import {
  component$,
  useContext,
  useSignal,
  useStyles$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { homeContext } from "../../HomeContext";
import { animateSlider, type AnimateSliderOptions } from "./animateSlider";
import styles from "./style.css?inline";

declare global {
  interface Window {
    heroSliderTimer: NodeJS.Timeout | undefined;
  }
}

const ImageSlider = component$(() => {
  useStyles$(styles);

  const homeContextStore = useContext(homeContext);
  const prevRef = useSignal<HTMLDivElement>();
  const currentRef = useSignal<HTMLDivElement>();
  const nextRef = useSignal<HTMLDivElement>();

  const prevIndex = useSignal<number>(homeContextStore.slides.length - 1);
  const nextIndex = useSignal<number>(1);

  const animateSliderOptions: Omit<AnimateSliderOptions, "direction"> = {
    prevRef,
    currentRef,
    nextRef,
    prevIndex,
    homeContextStore,
    nextIndex,
    blurValue: 10,
    duration: 1.5,
  };

  const isInitialized = useSignal<boolean>(false);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(() => homeContextStore.generalIndex);
    if (isInitialized.value === false) {
      isInitialized.value = true;
      return;
    }
    animateSlider({
      ...animateSliderOptions,
      direction: homeContextStore.direction ?? "next",
    });
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  // useVisibleTask$(({ track }) => {
  //   track(() => homeContextStore.generalIndex);
  //   window.heroSliderTimer = setInterval(async () => {
  //     homeContextStore.animationIsRunning = true;
  //     await animateSlider({ ...animateSliderOptions, direction: "next" });
  //     homeContextStore.animationIsRunning = false;
  //   }, 5000);

  //   return () => clearInterval(window.heroSliderTimer);
  // });

  return (
    <>
      <div class="hero-slider-container">
        <div class="hero-slider">
          <img
            ref={prevRef}
            class="slide prev"
            src={homeContextStore.slides[prevIndex.value].thumbnail}
            alt={homeContextStore.slides[prevIndex.value].title}
            width={1280}
            height={720}
          />

          <img
            ref={currentRef}
            class="slide current"
            src={
              homeContextStore.slides[homeContextStore.currentIndex].thumbnail
            }
            alt={homeContextStore.slides[homeContextStore.currentIndex].title}
            width={1280}
            height={720}
          />

          <img
            ref={nextRef}
            class="slide next"
            src={homeContextStore.slides[nextIndex.value].thumbnail}
            alt={homeContextStore.slides[nextIndex.value].title}
            width={1280}
            height={720}
          />
        </div>
      </div>
    </>
  );
});

export default ImageSlider;
