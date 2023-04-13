import {
  $,
  component$,
  useSignal,
  useStyles$,
} from "@builder.io/qwik";
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
  const vpRef = useSignal<HTMLDivElement>();
  const currentIndex = useSignal<number>(0)
  
  const handlePrev = $(() => {
    currentIndex.value = currentIndex.value === 0 ? images.length - 1: currentIndex.value - 1
  })

  const handleNext = $(() => {
    currentIndex.value = currentIndex.value + 1 === images.length? 0: currentIndex.value + 1
  })

  return <div ref={vpRef} class="hero-slider-container">
    <div >
      <button class="hero-slider-btn prev" onClick$={handlePrev}>Prev</button>
      <button class="hero-slider-btn next" onClick$={handleNext}>Next</button>
    </div>
  </div>;
});

export default ImageSlider;
