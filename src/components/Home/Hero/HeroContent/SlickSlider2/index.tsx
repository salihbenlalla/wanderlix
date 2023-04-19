import {
  component$,
  useContext,
  useSignal,
  //   useSignal,
  useStyles$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { animate } from "motion";
import { homeContext } from "~/components/Home/HomeContext";
import styles from "./style.css?inline";

export interface Slide {
  title: string;
  thumbnail: string;
  description: string;
}

export interface SlickSliderProps {
  slides: Slide[];
}

const SlickSlider = component$(() => {
  useStyles$(styles);

  const homeContextStore = useContext(homeContext);

  const prevIndex = useSignal(homeContextStore.slides.length - 1);
  const currentIndex = useSignal(0);
  const nextIndex = useSignal(1);

  const slideStyles = (index: number) => {
    const styles = {
      left: `${(index - homeContextStore.slickSliderCurrentIndex) * 100}%`,
      opacity: 1,
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
      (homeContextStore.direction === "prev" && index - prevIndex.value === 1)
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

    console.log(prevIndex.value);
    if (firstSlide.value && lastSlide.value) {
      if (homeContextStore.direction === "next") {
        animate(
          firstSlide.value,
          { left: "-100%" },
          { easing: "ease-out", duration: 1 }
        );
        animate(
          lastSlide.value,
          {
            left: `${(homeContextStore.slides.length - 1) * 100}%`,
          },
          { easing: "ease-out", duration: 1 }
        );
      }
      if (homeContextStore.direction === "prev") {
        animate(
          firstSlide.value,
          { left: "0%" },
          { easing: "ease-out", duration: 1 }
        );
        animate(
          lastSlide.value,
          {
            left: `${(homeContextStore.slides.length + 1) * 100}%`,
          },
          { easing: "ease-out", duration: 1 }
        );
      }
    }
  });
  return (
    <div class={`slider2-container`}>
      <div class="slider2-wrapper">
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
          style={{
            backgroundImage: `url(${
              homeContextStore.slides[prevIndex.value].thumbnail
            })`,
            left: `${homeContextStore.slides.length * 100}%`,
            opacity: 1,
          }}
        >
          <div class="slide2-content">
            <h2>{homeContextStore.slides[prevIndex.value].title}</h2>
            <p>{homeContextStore.slides[prevIndex.value].description}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default SlickSlider;
