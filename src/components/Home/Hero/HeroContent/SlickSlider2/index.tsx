import {
  component$,
  useContext,
  useStyles$,
  useVisibleTask$,
} from "@builder.io/qwik";
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

  useVisibleTask$(({ track }) => {
    track(() => homeContextStore.currentIndex);
    if (homeContextStore.currentIndex === homeContextStore.slides.length - 1) {
      console.log("reached the end", homeContextStore.slides.length);
    }
  });

  const slideStyles = (index: number) => {
    const styles = {
      left: `${(index - homeContextStore.currentIndex - 1) * 100}%`,
      opacity: 1,
    };
    if (index - homeContextStore.currentIndex < 0) {
      styles.left = `${
        (homeContextStore.slides.length -
          homeContextStore.currentIndex +
          index -
          1) *
        100
      }%`;
      //   styles.opacity = 0;
    }
    return styles;
  };

  return (
    <div class={`slider2-container`}>
      <div class="slider2-wrapper">
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
        {/* <div
          class={`slide2`}
          style={{
            backgroundImage: `url(${homeContextStore.slides[0].thumbnail})`,
            left: `${
              (homeContextStore.slides.length - homeContextStore.currentIndex) *
              100
            }%`,
          }}
        >
          <div class="slide2-content">
            <h2>{homeContextStore.slides[0].title}</h2>
            <p>{homeContextStore.slides[0].description}</p>
          </div>
        </div>
        <div
          class={`slide2`}
          style={{
            backgroundImage: `url(${homeContextStore.slides[1].thumbnail})`,
            left: `${
              (homeContextStore.slides.length +
                1 -
                homeContextStore.currentIndex) *
              100
            }%`,
          }}
        >
          <div class="slide2-content">
            <h2>{homeContextStore.slides[1].title}</h2>
            <p>{homeContextStore.slides[1].description}</p>
          </div>
        </div> */}
      </div>
    </div>
  );
});

export default SlickSlider;
