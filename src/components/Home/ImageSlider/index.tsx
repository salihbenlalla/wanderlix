import { $, component$, useSignal, useStyles$ } from "@builder.io/qwik";
// import { animate } from "motion";
import { animateSlider, type AnimateSliderOptions } from "./animateSlider";
import styles from "./style.css?inline";

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
  const sliderRef = useSignal<HTMLCanvasElement>();
  const currentIndex = useSignal<number>(0);
  const scaleSignal = useSignal<number>(1);
  const blurSignal = useSignal<number>(0);

  const animateSliderOptions: Omit<AnimateSliderOptions, "direction"> = {
    sliderRef,
    currentIndex,
    scaleSignal,
    scaleValue: 5,
    blurSignal,
    blurValue: 5,
    images,
    duration: 1,
  };

  const handlePrev = $(() => {
    animateSlider({ ...animateSliderOptions, direction: "prev" });
  });

  const handleNext = $(() => {
    animateSlider({ ...animateSliderOptions, direction: "next" });
  });

  return (
    <div class="hero-slider-container">
      <div
        ref={sliderRef}
        class="hero-slider"
        style={{
          backgroundImage: `url("${images[currentIndex.value]}")`,
          transform: `scale(${scaleSignal.value})`,
          filter: `blur(${blurSignal.value}px)`,
        }}
      ></div>
      <button class="hero-slider-btn-prev" onClick$={handlePrev}>
        Prev
      </button>
      <button class="hero-slider-btn-next" onClick$={handleNext}>
        Next
      </button>
    </div>
  );
});

export default ImageSlider;
