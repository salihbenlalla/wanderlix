import {
  $,
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
    heroSliderTimer: NodeJS.Timer | undefined;
  }
}

const images = [
  "/images/place1.jpg",
  "/images/place2.jpg",
  "/images/place3.jpg",
  "/images/place4.jpg",
  "/images/place5.jpg",
  "/images/place6.jpg",
];

const ImageSlider = component$(() => {
  useStyles$(styles);
  const prevRef = useSignal<HTMLDivElement>();
  const currentRef = useSignal<HTMLDivElement>();
  const nextRef = useSignal<HTMLDivElement>();

  const prevIndex = useSignal<number>(images.length - 1);
  const currentIndex = useContext(homeContext);
  const nextIndex = useSignal<number>(1);

  const animateSliderOptions: Omit<AnimateSliderOptions, "direction"> = {
    prevRef,
    currentRef,
    nextRef,
    prevIndex,
    currentIndex,
    nextIndex,
    images,
    blurValue: 10,
    duration: 1,
  };

  useVisibleTask$(() => {
    window.heroSliderTimer = setInterval(() => {
      console.log("from ImageSlider: ", currentIndex.value);
      animateSlider({ ...animateSliderOptions, direction: "next" });
    }, 5000);

    return () => clearInterval(window.heroSliderTimer);
  });

  const handlePrev = $(() => {
    animateSlider({ ...animateSliderOptions, direction: "prev" });
  });

  const handleNext = $(() => {
    animateSlider({ ...animateSliderOptions, direction: "next" });
  });

  return (
    <>
      <div class="hero-slider-container">
        <div class="hero-slider">
          <div
            ref={prevRef}
            class="slide prev"
            style={{
              backgroundImage: `url("${images[prevIndex.value]}")`,
            }}
          />
          <div
            ref={currentRef}
            class="slide current"
            style={{
              backgroundImage: `url("${images[currentIndex.value]}")`,
            }}
          />
          <div
            ref={nextRef}
            class="slide next"
            style={{
              backgroundImage: `url("${images[nextIndex.value]}")`,
            }}
          />
        </div>
        <button class="hero-slider-btn-prev" onClick$={handlePrev}>
          &lsaquo;
        </button>
        <button class="hero-slider-btn-next" onClick$={handleNext}>
          &rsaquo;
        </button>
      </div>
    </>
  );
});

export default ImageSlider;
