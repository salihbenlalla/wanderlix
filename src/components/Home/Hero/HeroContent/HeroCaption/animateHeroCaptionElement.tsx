import { type Signal } from "@builder.io/qwik";
import { animate } from "motion";
import { type Slide } from "../SlickSlider";

interface AnimationCommonOptions {
  currentIndex: Signal<number>;
  prevIndex: Signal<number>;
  nextIndex: Signal<number>;
  direction: "prev" | "next" | undefined;
  slides: Slide[];
  typeOfElement: "current" | "next" | "prev";
}

interface animateSingleElementOptions extends AnimationCommonOptions {
  elementRef: Signal<HTMLElement | undefined>;
  changeIndex: boolean;
}

interface animateHeroCaptionElementOptions extends AnimationCommonOptions {
  elementRef:
    | Signal<HTMLElement | undefined>
    | Signal<HTMLElement | undefined>[];
}

const changeIndex = (options: animateHeroCaptionElementOptions) => {
  if (options.direction === "prev") {
    options.currentIndex.value =
      options.currentIndex.value === 0
        ? options.slides.length - 1
        : options.currentIndex.value - 1;

    options.prevIndex.value =
      options.prevIndex.value === 0
        ? options.slides.length - 1
        : options.prevIndex.value - 1;

    options.nextIndex.value =
      options.nextIndex.value === 0
        ? options.slides.length - 1
        : options.nextIndex.value - 1;
  } else {
    options.currentIndex.value =
      options.currentIndex.value + 1 === options.slides.length
        ? 0
        : options.currentIndex.value + 1;

    options.prevIndex.value =
      options.prevIndex.value + 1 === options.slides.length
        ? 0
        : options.prevIndex.value + 1;

    options.nextIndex.value =
      options.nextIndex.value + 1 === options.slides.length
        ? 0
        : options.nextIndex.value + 1;
  }
};

const animateSingleElement = (options: animateSingleElementOptions) => {
  //   const bottomValue = options.typeOfElement === "current" ? "150px" : "0px";
  if (options.elementRef.value) {
    animate(
      options.elementRef.value,
      { transform: "translate3d(0, -100%, 0)" },
      { duration: 0.5 }
    ).finished.then(() => {
      if (options.changeIndex) {
        changeIndex(options);

        if (options.elementRef.value) {
          animate(
            options.elementRef.value,
            { transform: "translate3d(0, 0, 0)" },
            { duration: 0 }
          );
        }
      }
      //   if (options.elementRef.value) {
      //     animate(
      //       options.elementRef.value,
      //       { bottom: "-150px" },
      //       { duration: 0 }
      //     ).finished.then(() => {
      //       if (options.changeIndex) {
      //         changeIndex(options);
      //       }
      //       if (options.elementRef.value) {
      //         animate(
      //           options.elementRef.value,
      //           { bottom: "0px" },
      //           { duration: 0.5 }
      //         );
      //       }
      //     });
      //   }
    });
  }
};

export const animateHeroCaptionElement = (
  options: animateHeroCaptionElementOptions
) => {
  if (Array.isArray(options.elementRef)) {
    options.elementRef.map((element, index) => {
      const changeIndex = index === 0 ? true : false;
      animateSingleElement({
        elementRef: element,
        currentIndex: options.currentIndex,
        prevIndex: options.prevIndex,
        nextIndex: options.nextIndex,
        direction: options.direction,
        slides: options.slides,
        changeIndex,
        typeOfElement: options.typeOfElement,
      });
    });
  } else {
    animateSingleElement({
      elementRef: options.elementRef,
      currentIndex: options.currentIndex,
      prevIndex: options.prevIndex,
      nextIndex: options.nextIndex,
      direction: options.direction,
      slides: options.slides,
      changeIndex: true,
      typeOfElement: options.typeOfElement,
    });
  }
};
