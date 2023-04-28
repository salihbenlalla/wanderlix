import {
  //   $,
  //   $,
  component$,
  useContext,
  useSignal,
  useStyles$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { homeContext } from "../../HomeContext";
// import { type SlickSliderProps } from "../HeroContent/SlickSlider2";
import { animateSlider, type AnimateSliderOptions } from "./animateSlider";
import styles from "./style.css?inline";

declare global {
  interface Window {
    heroSliderTimer: NodeJS.Timer | undefined;
  }
}

// const images = [
//   "/images/place1.jpg",
//   "/images/place2.jpg",
//   "/images/place3.jpg",
//   "/images/place4.jpg",
//   "/images/place5.jpg",
//   "/images/place6.jpg",
// ];

const ImageSlider = component$(() => {
  useStyles$(styles);

  const homeContextStore = useContext(homeContext);
  const prevRef = useSignal<HTMLDivElement>();
  const currentRef = useSignal<HTMLDivElement>();
  const nextRef = useSignal<HTMLDivElement>();

  const prevIndex = useSignal<number>(homeContextStore.slides.length - 1);
  const nextIndex = useSignal<number>(1);

  //   const slides = homeContextStore.slides;

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

  useVisibleTask$(() => {
    window.heroSliderTimer = setInterval(() => {
      animateSlider({ ...animateSliderOptions, direction: "next" });
      //   changeIndex({ ...animateSliderOptions, direction: "next" });
    }, 10000);

    return () => clearInterval(window.heroSliderTimer);
  });

  const isInitialized = useSignal<boolean>(false);

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

  //   const handlePrev = $(() => {
  //     animateSlider({ ...animateSliderOptions, direction: "prev" });
  //   });

  //   const handleNext = $(() => {
  //     animateSlider({ ...animateSliderOptions, direction: "next" });
  //   });

  return (
    <>
      <div class="hero-slider-container">
        <div class="hero-slider">
          <div
            ref={prevRef}
            class="slide prev"
            style={{
              backgroundImage: `url("${
                homeContextStore.slides[prevIndex.value].thumbnail
              }")`,
            }}
          />
          <div
            ref={currentRef}
            class="slide current"
            style={{
              backgroundImage: `url("${
                homeContextStore.slides[homeContextStore.currentIndex].thumbnail
              }")`,
            }}
          />
          <div
            ref={nextRef}
            class="slide next"
            style={{
              backgroundImage: `url("${
                homeContextStore.slides[nextIndex.value].thumbnail
              }")`,
            }}
          />
        </div>
      </div>
    </>
  );
});

export default ImageSlider;
