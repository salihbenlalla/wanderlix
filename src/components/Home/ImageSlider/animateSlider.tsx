import { type Signal } from "@builder.io/qwik";
import { animate } from "motion";

export interface AnimateSliderOptions {
  sliderRef: Signal<HTMLCanvasElement | undefined>;
  currentIndex: Signal<number>;
  scaleSignal: Signal<number>;
  scaleValue: number;
  blurSignal: Signal<number>;
  blurValue: number;
  images: string[];
  direction: "prev" | "next";
  duration: number;
}

export const animateSlider = (options: AnimateSliderOptions) => {
  if (options.sliderRef.value) {
    animate(
      options.sliderRef.value,
      {
        transform: `scale(${options.scaleValue})`,
        filter: `blur(${options.blurValue}px)`,
      },
      { duration: options.duration, easing: "ease-in-out" }
    ).finished.then(() => {
      options.scaleSignal.value = options.scaleValue;
      options.blurSignal.value = options.blurValue;
      if (options.direction === "prev") {
        options.currentIndex.value =
          options.currentIndex.value === 0
            ? options.images.length - 1
            : options.currentIndex.value - 1;
      }
      if (options.direction === "next") {
        options.currentIndex.value =
          options.currentIndex.value + 1 === options.images.length
            ? 0
            : options.currentIndex.value + 1;
      }
      if (options.sliderRef.value) {
        animate(
          options.sliderRef.value,
          {
            transform: `scale(1)`,
            filter: `blur(0px)`,
          },
          { duration: options.duration, easing: "ease-in-out" }
        ).finished.then(() => {
          options.scaleSignal.value = 1;
          options.blurSignal.value = 0;
        });
      }
    });
  }
};
