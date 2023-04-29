import {
  component$,
  useContext,
  useSignal,
  useStyles$,
  useVisibleTask$,
} from "@builder.io/qwik";
import styles from "./style.css?inline";
import { homeContext } from "~/components/Home/HomeContext";
import { animateHeroCaptionElement } from "./animateHeroCaptionElement";

export default component$(() => {
  useStyles$(styles);

  const homeContextStore = useContext(homeContext);
  const currentIndex = useSignal(homeContextStore.currentIndex);
  const slides = homeContextStore.slides;
  const prevIndex = useSignal(
    currentIndex.value === 0 ? slides.length - 1 : currentIndex.value - 1
  );
  const nextIndex = useSignal(
    currentIndex.value + 1 === slides.length ? 0 : currentIndex.value + 1
  );

  const h1Ref = useSignal<HTMLHeadingElement>();
  const h1NextRef = useSignal<HTMLHeadingElement>();

  const pRef = useSignal<HTMLHeadingElement>();
  const pNextRef = useSignal<HTMLHeadingElement>();

  const buttonRef = useSignal<HTMLHeadingElement>();
  const buttonNextRef = useSignal<HTMLHeadingElement>();

  const initialized = useSignal<boolean>(false);

  const h1Height = useSignal<number | "initial">(64);
  const pHeight = useSignal<number | "initial">(48);
  const buttonHeight = useSignal<number | "initial">("initial");

  useVisibleTask$(({ track }) => {
    track(() => homeContextStore.slickSliderCurrentIndex);
    console.log("button height", buttonRef.value?.clientHeight);
    h1Height.value = h1Ref.value?.clientHeight ?? 0;
    pHeight.value = pRef.value?.clientHeight ?? 0;
    buttonHeight.value = buttonRef.value?.clientHeight ?? 0;
    if (initialized.value === false) {
      initialized.value = true;
      return;
    }
    animateHeroCaptionElement({
      elementRef: [h1Ref, pRef, buttonRef],
      currentIndex,
      slides,
      prevIndex,
      nextIndex,
      direction: homeContextStore.direction,
      typeOfElement: "current",
    });

    animateHeroCaptionElement({
      elementRef: [h1NextRef, pNextRef, buttonNextRef],
      currentIndex,
      slides,
      prevIndex,
      nextIndex,
      direction: homeContextStore.direction,
      typeOfElement: "next",
    });
  });
  return (
    <div class="hero-caption">
      <h1 style={{ height: `${h1Height.value}px` }}>
        <span ref={h1Ref}>{slides[currentIndex.value].title}</span>
        <span ref={h1NextRef} class="caption-next-element-hidden">
          {slides[nextIndex.value].title}
        </span>
      </h1>
      <p style={{ height: `${pHeight.value}px` }}>
        <span ref={pRef}>{slides[currentIndex.value].description}</span>
        <span ref={pNextRef} class="caption-next-element-hidden">
          {slides[nextIndex.value].description}
        </span>
      </p>
      <div
        class="caption-button-container"
        style={{ height: `${pHeight.value}px` }}
      >
        <button ref={buttonRef}>
          DISCOVER LOCATION
          {/* <span class="button-arrow">&rarr;</span> */}
        </button>
        <button ref={buttonNextRef} class="caption-next-element-hidden">
          DISCOVER LOCATION
          {/* <span class="button-arrow">&rarr;</span> */}
        </button>
      </div>
    </div>
  );
});
