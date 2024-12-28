import { type Signal } from "@builder.io/qwik";
import { timeline } from "motion";
import { type HomeContextStore } from "../..";

export interface AnimateSliderOptions {
  prevRef: Signal<HTMLDivElement | undefined>;
  currentRef: Signal<HTMLDivElement | undefined>;
  nextRef: Signal<HTMLDivElement | undefined>;
  prevIndex: Signal<number>;
  homeContextStore: HomeContextStore;
  nextIndex: Signal<number>;
  blurValue: number;
  duration: number;
  direction: "prev" | "next";
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function correctionAnimation(options: AnimateSliderOptions) {
  if (
    !options.currentRef.value ||
    !options.prevRef.value ||
    !options.nextRef.value
  ) {
    return;
  }
  await timeline([
    [
      options.currentRef.value,
      {
        opacity: 1,
        transform: `scale(1)`,
      },
      {
        duration: 0,
      },
    ],
    [
      options.direction === "prev"
        ? options.prevRef.value
        : options.nextRef.value,
      {
        opacity: 0,
        transform: `scale(5)`,
      },
      {
        duration: 0,
      },
    ],
  ]).finished;
}

export const changeIndex = async (options: AnimateSliderOptions) => {
  const prevIndex = options.prevIndex.value;
  const currentIndex = options.homeContextStore.currentIndex;
  const nextIndex = options.nextIndex.value;
  const lastIndex = options.homeContextStore.slides.length - 1;
  if (options.direction === "prev") {
    options.homeContextStore.currentIndex =
      currentIndex === 0 ? lastIndex : currentIndex - 1;
    await sleep(1);
    await correctionAnimation(options);
    options.prevIndex.value = prevIndex === 0 ? lastIndex : prevIndex - 1;
    options.nextIndex.value = nextIndex === 0 ? lastIndex : nextIndex - 1;
  }
  if (options.direction === "next") {
    options.homeContextStore.currentIndex =
      currentIndex === lastIndex ? 0 : currentIndex + 1;
    await sleep(1);
    await correctionAnimation(options);
    options.prevIndex.value = prevIndex === lastIndex ? 0 : prevIndex + 1;
    options.nextIndex.value = nextIndex === lastIndex ? 0 : nextIndex + 1;
  }
};

const changeSlickSliderIndex = (options: AnimateSliderOptions) => {
  const currentIndex = options.homeContextStore.slickSliderCurrentIndex;
  const lastIndex = options.homeContextStore.slides.length - 1;
  if (options.direction === "prev") {
    options.homeContextStore.slickSliderCurrentIndex =
      currentIndex === 0 ? lastIndex : currentIndex - 1;
  }
  if (options.direction === "next") {
    options.homeContextStore.slickSliderCurrentIndex =
      currentIndex === lastIndex ? 0 : currentIndex + 1;
  }
};

export const animateSlider = async (options: AnimateSliderOptions) => {
  if (options.direction === "next") {
    options.homeContextStore.direction = "next";
  }
  if (options.direction === "prev") {
    options.homeContextStore.direction = "prev";
  }
  if (
    options.prevRef.value &&
    options.nextRef.value &&
    options.currentRef.value
  ) {
    changeSlickSliderIndex(options);
    await timeline([
      //animate scale and opacity of prev/next slide
      [
        options.direction === "prev"
          ? options.prevRef.value
          : options.nextRef.value,
        {
          opacity: 1,
          transform: `scale(1)`,
        },
        {
          duration: options.duration,
          easing: "ease-out",
          at: 0,
        },
      ],
      // animate blur of prev/next slide
      [
        options.direction === "prev"
          ? options.prevRef.value
          : options.nextRef.value,
        {
          filter: `blur(${options.blurValue}px)`,
        },
        {
          duration: options.duration * 0.5,
          easing: "ease-out",
          at: 0,
        },
      ],
      // return blur of prev/next slide to initial state
      [
        options.direction === "prev"
          ? options.prevRef.value
          : options.nextRef.value,
        {
          filter: `blur(0px)`,
        },
        {
          duration: options.duration * 0.5,
          easing: "ease-out",
          at: options.duration * 0.5,
        },
      ],
      [
        options.currentRef.value,
        {
          opacity: 0,
          transform: `scale(5)`,
        },
        { duration: options.duration, easing: "ease-in", at: 0 },
      ],
      // animate blur of current slide
      [
        options.currentRef.value,
        {
          filter: `blur(${options.blurValue}px)`,
        },
        {
          duration: options.duration * 0.5,
          easing: "ease-in",
          at: 0,
        },
      ],
      // return blur of current slide to initial state
      [
        options.currentRef.value,
        {
          filter: `blur(0px)`,
        },
        {
          duration: options.duration * 0.5,
          easing: "ease-in",
          at: options.duration * 0.5,
        },
      ],
    ]).finished;

    changeIndex(options);
  }
};
