import {
  $,
  component$,
  useContext,
  useSignal,
  useStyles$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { animate } from "motion";
import { homeContext } from "~/components/Home/HomeContext";
import styles from "./style.css?inline";
import { changeGeneralIndex } from "./changeGeneralIndex";

export interface Slide {
  title: string;
  url: string;
  thumbnail: string;
  description: string;
}

const SlickSlider = component$(() => {
  useStyles$(styles);

  const homeContextStore = useContext(homeContext);

  const prevIndex = useSignal(homeContextStore.slides.length - 1);
  const currentIndex = useSignal(0);
  const nextIndex = useSignal(1);

  const firstSlide = useSignal<HTMLDivElement>();
  const lastSlide = useSignal<HTMLDivElement>();

  const isTransparent = (index: number) => {
    return (homeContextStore.direction === "next" &&
      index - prevIndex.value === 0) ||
      (homeContextStore.direction === "prev" &&
        index - currentIndex.value === 0)
      ? " transparent"
      : "";
  };

  const getLeftValue = (index: number) => {
    const leftValue =
      index - homeContextStore.slickSliderCurrentIndex < 0
        ? `${
            (homeContextStore.slides.length -
              homeContextStore.slickSliderCurrentIndex +
              index) *
            100
          }`
        : `${(index - homeContextStore.slickSliderCurrentIndex) * 100}`;

    return leftValue;
  };

  const getProgressBarWidth = () => {
    const width =
      ((homeContextStore.slickSliderCurrentIndex === 0
        ? homeContextStore.slides.length
        : homeContextStore.slickSliderCurrentIndex) /
        homeContextStore.slides.length) *
      100;
    return Math.trunc(width);
  };

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(() => homeContextStore.slickSliderCurrentIndex);

    prevIndex.value =
      homeContextStore.slickSliderCurrentIndex === 0
        ? homeContextStore.slides.length - 1
        : homeContextStore.slickSliderCurrentIndex - 1;

    nextIndex.value =
      homeContextStore.slickSliderCurrentIndex + 1 ===
      homeContextStore.slides.length
        ? 0
        : homeContextStore.slickSliderCurrentIndex + 1;

    currentIndex.value = homeContextStore.slickSliderCurrentIndex;

    if (firstSlide.value && lastSlide.value) {
      if (homeContextStore.direction === "next") {
        animate(firstSlide.value, { left: "0%" }, { duration: 0 });
        animate(lastSlide.value, { left: "600%" }, { duration: 0 });
        animate(
          firstSlide.value,
          { left: "-100%" },
          { easing: "ease-out", duration: 1.5 },
        );
        animate(
          lastSlide.value,
          {
            left: "500%",
          },
          { easing: "ease-out", duration: 1.5 },
        );
      }
      if (homeContextStore.direction === "prev") {
        animate(firstSlide.value, { left: "-100%" }, { duration: 0 });
        animate(lastSlide.value, { left: "500%" }, { duration: 0 });
        animate(
          firstSlide.value,
          { left: "0%" },
          { easing: "ease-out", duration: 1.5 },
        );
        animate(
          lastSlide.value,
          {
            left: "600%",
          },
          { easing: "ease-out", duration: 1.5 },
        );
      }
    }
  });

  const handlePrev = $(() => {
    if (!homeContextStore.animationIsRunning) {
      clearInterval(window.heroSliderTimer);
      homeContextStore.animationIsRunning = true;
      changeGeneralIndex(homeContextStore, "prev");
      window.generalIndexTimeout = setTimeout(() => {
        homeContextStore.animationIsRunning = false;
      }, 1500);
    }
  });

  const handleNext = $(() => {
    if (!homeContextStore.animationIsRunning) {
      clearInterval(window.heroSliderTimer);
      homeContextStore.animationIsRunning = true;
      changeGeneralIndex(homeContextStore, "next");
      window.generalIndexTimeout = setTimeout(() => {
        homeContextStore.animationIsRunning = false;
      }, 1500);
    }
  });

  return (
    <div class="slick-slider-container">
      <div class={`slider2-container`}>
        <div class="slider2-wrapper">
          <div ref={firstSlide} class="slide2 first-slide">
            <a
              href={
                homeContextStore.slides[
                  homeContextStore.direction === "next"
                    ? prevIndex.value
                    : currentIndex.value
                ].url
              }
            >
              <div class="slide2-content">
                <img
                  src={
                    homeContextStore.slides[
                      homeContextStore.direction === "next"
                        ? prevIndex.value
                        : currentIndex.value
                    ].thumbnail
                  }
                  alt={
                    homeContextStore.slides[
                      homeContextStore.direction === "next"
                        ? prevIndex.value
                        : currentIndex.value
                    ].title
                  }
                  width={170}
                  height={230}
                />

                <h2>
                  {
                    homeContextStore.slides[
                      homeContextStore.direction === "next"
                        ? prevIndex.value
                        : currentIndex.value
                    ].title
                  }
                </h2>
              </div>
            </a>
          </div>
          {homeContextStore.slides.map((slide, index) => (
            <div
              key={index}
              class={`slide2${isTransparent(index)} left-${getLeftValue(index)}`}
            >
              <a href={slide.url}>
                <div class="slide2-content">
                  <img
                    src={slide.thumbnail}
                    alt={slide.title}
                    width={170}
                    height={230}
                  />
                  <h2>{slide.title}</h2>
                </div>
              </a>
            </div>
          ))}
          <div ref={lastSlide} class={`slide2`}>
            <a
              href={
                homeContextStore.slides[
                  homeContextStore.direction === "prev"
                    ? currentIndex.value
                    : prevIndex.value
                ].url
              }
            >
              <div class="slide2-content">
                <img
                  src={
                    homeContextStore.slides[
                      homeContextStore.direction === "prev"
                        ? currentIndex.value
                        : prevIndex.value
                    ].thumbnail
                  }
                  alt={
                    homeContextStore.slides[
                      homeContextStore.direction === "next"
                        ? prevIndex.value
                        : currentIndex.value
                    ].title
                  }
                  width={170}
                  height={230}
                />
                <h2>
                  {
                    homeContextStore.slides[
                      homeContextStore.direction === "prev"
                        ? currentIndex.value
                        : prevIndex.value
                    ].title
                  }
                </h2>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div class="slick-slider-btns">
        <button class="slick-slider-btn-prev" onClick$={handlePrev}>
          &#10094;
        </button>
        <button class="slick-slider-btn-next" onClick$={handleNext}>
          &#10095;
        </button>
        <div class="progress-bar-container">
          <div class={`progress-bar width-${getProgressBarWidth()}`}></div>
        </div>
        <div class="progress-bar-index">
          0{homeContextStore.currentIndex + 1}
        </div>
      </div>
    </div>
  );
});

export default SlickSlider;
