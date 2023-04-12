import {
  component$,
  useSignal,
  useStyles$,
  useVisibleTask$,
} from "@builder.io/qwik";
import styles from "./style.css?inline";
import { vanish } from "./vanish";

const ImageSlider = component$(() => {
  useStyles$(styles);
  const vpRef = useSignal<HTMLDivElement>();

  useVisibleTask$(() => {
    if (vpRef.value) {
      vanish("/images/place1.jpg", vpRef.value);
    }
  });

  return <div ref={vpRef} class="image"></div>;
});

export default ImageSlider;
