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
  thumbnail: string;
  description: string;
}

export interface SlickSliderProps {
  //   slides: Slide[];
  slideWidth: number;
  slideHeight: number;
  margin: number;
}

const SlickSlider = component$<SlickSliderProps>((props) => {
  useStyles$(styles);

  const homeContextStore = useContext(homeContext);

  const prevIndex = useSignal(homeContextStore.slides.length - 1);
  const currentIndex = useSignal(0);
  const nextIndex = useSignal(1);

  const commonSlideStyles = {
    width: `${props.slideWidth}px`,
    marginLeft: `${props.margin}px`,
    marginRight: `${props.margin}px`,
  };

  const slideStyles = (index: number) => {
    const styles = {
      left: `${(index - homeContextStore.slickSliderCurrentIndex) * 100}%`,
      opacity: 1,
      cursor: "pointer",
      ...commonSlideStyles,
    };
    if (index - homeContextStore.slickSliderCurrentIndex < 0) {
      styles.left = `${
        (homeContextStore.slides.length -
          homeContextStore.slickSliderCurrentIndex +
          index) *
        100
      }%`;
    }

    if (
      (homeContextStore.direction === "next" &&
        index - prevIndex.value === 0) ||
      (homeContextStore.direction === "prev" &&
        index - currentIndex.value === 0)
    ) {
      styles.opacity = 0;
    }
    return styles;
  };

  const firstSlide = useSignal<HTMLDivElement>();
  const lastSlide = useSignal<HTMLDivElement>();

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
        animate(
          firstSlide.value,
          { left: "-100%" },
          { easing: "ease-out", duration: 1.5 }
        );
        animate(
          lastSlide.value,
          {
            left: `${(homeContextStore.slides.length - 1) * 100}%`,
          },
          { easing: "ease-out", duration: 1.5 }
        );
      }
      if (homeContextStore.direction === "prev") {
        animate(
          firstSlide.value,
          { left: "0%" },
          { easing: "ease-out", duration: 1.5 }
        );
        animate(
          lastSlide.value,
          {
            left: `${homeContextStore.slides.length * 100}%`,
          },
          { easing: "ease-out", duration: 1.5 }
        );
      }
    }
  });

  const handlePrev = $(() => {
    changeGeneralIndex(homeContextStore, "prev");
  });

  const handleNext = $(() => {
    changeGeneralIndex(homeContextStore, "next");
  });

  return (
    <div class="slick-slider-container">
      <div
        class={`slider2-container`}
        style={{
          width: `${
            (props.slideWidth + 2 * props.margin) *
            homeContextStore.slides.length
          }px`,
        }}
      >
        <div
          class="slider2-wrapper"
          style={{
            width: `${props.slideWidth + props.margin * 2}px`,
            height: `${props.slideHeight}px`,
          }}
        >
          <div
            ref={firstSlide}
            class={`slide2`}
            style={{
              backgroundImage: `url(${
                homeContextStore.slides[
                  homeContextStore.direction === "next"
                    ? prevIndex.value
                    : currentIndex.value
                ].thumbnail
              })`,
              left: homeContextStore.direction === "next" ? "0%" : "-100%",
              opacity: 1,
              ...commonSlideStyles,
            }}
          >
            <div class="slide2-content">
              <h2>
                {
                  homeContextStore.slides[
                    homeContextStore.direction === "next"
                      ? prevIndex.value
                      : currentIndex.value
                  ].title
                }
              </h2>
              <p>
                {
                  homeContextStore.slides[
                    homeContextStore.direction === "next"
                      ? prevIndex.value
                      : currentIndex.value
                  ].description
                }
              </p>
            </div>
          </div>
          {homeContextStore.slides.map((slide, index) => (
            <div
              key={index}
              class={`slide2`}
              style={{
                backgroundImage: `url(${slide.thumbnail})`,
                ...slideStyles(index),
              }}
            >
              <div class="slide2-content">
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
              </div>
            </div>
          ))}
          <div
            ref={lastSlide}
            class={`slide2`}
            //   style={{
            //     backgroundImage: `url(${
            //       homeContextStore.slides[prevIndex.value].thumbnail
            //     })`,
            //     left: `${(homeContextStore.slides.length - 1) * 100}%`,
            //     opacity: 1,
            //   }}
            style={{
              backgroundImage: `url(${
                homeContextStore.slides[
                  homeContextStore.direction === "prev"
                    ? currentIndex.value
                    : prevIndex.value
                ].thumbnail
              })`,
              left:
                homeContextStore.direction === "prev"
                  ? `${(homeContextStore.slides.length - 1) * 100}%`
                  : `${homeContextStore.slides.length * 100}%`,
              opacity: 1,
              ...commonSlideStyles,
            }}
          >
            <div class="slide2-content">
              <h2>
                {
                  homeContextStore.slides[
                    homeContextStore.direction === "prev"
                      ? currentIndex.value
                      : prevIndex.value
                  ].title
                }
              </h2>
              <p>
                {
                  homeContextStore.slides[
                    homeContextStore.direction === "prev"
                      ? currentIndex.value
                      : prevIndex.value
                  ].description
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="hero-slider-btns">
        <button class="hero-slider-btn-prev" onClick$={handlePrev}>
          &#10094;
        </button>
        <button class="hero-slider-btn-next" onClick$={handleNext}>
          &#10095;
        </button>
        <div class="progress-bar-container">
          <div
            class="progress-bar"
            style={{
              width: `${
                ((homeContextStore.slickSliderCurrentIndex === 0
                  ? homeContextStore.slides.length
                  : homeContextStore.slickSliderCurrentIndex) /
                  homeContextStore.slides.length) *
                100
              }%`,
            }}
          ></div>
        </div>
        <div class="progress-bar-index">
          0{homeContextStore.currentIndex + 1}
        </div>
      </div>
    </div>
  );
});

export default SlickSlider;
