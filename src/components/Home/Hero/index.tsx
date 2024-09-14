import {
  component$,
  useSignal,
  useStyles$,
  useVisibleTask$,
} from "@builder.io/qwik";
import HeroContent from "./HeroContent";
import ImageSlider from "./imageSlider";
import styles from "./style.css?inline";

const Hero = component$(() => {
  useStyles$(styles);

  const heroHeight = useSignal<number | string>("calc(100vh - 87px)");

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    heroHeight.value = `${document.documentElement.clientHeight - 87}px`;
  });

  return (
    <div class="hero-container">
      <div class="hero-blur"></div>
      <ImageSlider />
      <HeroContent />
    </div>
  );
});

export default Hero;
