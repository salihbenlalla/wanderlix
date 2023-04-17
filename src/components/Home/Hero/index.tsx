import { component$, useStyles$ } from "@builder.io/qwik";
import ImageSlider from "./imageSlider";
import styles from "./style.css?inline";

const Hero = component$(() => {
  useStyles$(styles);

  return (
    <div class="hero-container">
      <div class="hero-blur"></div>
      <ImageSlider />
    </div>
  );
});

export default Hero;
