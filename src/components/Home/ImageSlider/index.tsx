import {
  component$,
  type QwikMouseEvent,
  useStyles$,
  useSignal,
  $,
} from "@builder.io/qwik";
import styles from "./style.css?inline";

type MouseMoveEvent = QwikMouseEvent<HTMLImageElement, MouseEvent>;

const ImageSlider = component$(() => {
  useStyles$(styles);
  const image = useSignal<HTMLDivElement>();

  const mouseMove = $((e: MouseMoveEvent, container: HTMLDivElement) => {
    const boundingRect = container.getBoundingClientRect();
    const offsetX = e.clientX - Number(boundingRect?.left);
    const offsetY = e.clientY - Number(boundingRect?.top);
    const centerX = Number(boundingRect?.width) / 2;
    const centerY = Number(boundingRect?.height) / 2;
    const deltaX = (centerX - offsetX) / centerX;
    const deltaY = (centerY - offsetY) / centerY;
    const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const scale = dist * 2;
    const rotateX = (offsetY - centerY) / centerY;
    const rotateY = (centerX - offsetX) / centerX;
    if (image.value) {
      image.value.style.transform = `scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  });

  const mouseLeave = $(() => {
    if (image.value) {
      image.value.style.transform = "none";
    }
  });

  return (
    <div class="image" onMouseMove$={mouseMove} onMouseLeave$={mouseLeave}>
      <img src="/images/place1.jpg" ref={image} />
    </div>
  );
});

export default ImageSlider;
