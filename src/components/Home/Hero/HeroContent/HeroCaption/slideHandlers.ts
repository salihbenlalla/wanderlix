import { type Signal } from "@builder.io/qwik";
import { animate } from "motion";
import { type HomeContextStore } from "~/components/Home";
// import { changeIndex } from "./changeIndex";

const duration = 1.5;

function timeout(ms: number): Promise<void> {
  return new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId); // Clear the timeout after it completes
      resolve();
    }, ms);
  });
}

export async function slideUp(
  element: Signal<HTMLElement | undefined>,
  placeholder: Signal<string>,
  transitioning: Signal<boolean>,
  homeContextStore: HomeContextStore,
  elementType: "title" | "description" | "url",
) {
  let topValue;

  switch (elementType) {
    case "title":
      topValue = "-56%";
      break;
    case "description":
      topValue = "-50%";
      break;
    default:
      topValue = "-40%";
  }

  if (element.value) {
    await animate(
      element.value,
      { top: topValue },
      { easing: "ease-out", duration },
    ).finished;

    transitioning.value = true;
    placeholder.value =
      homeContextStore.slides[homeContextStore.captionNextIndex][elementType];
    await timeout(1);

    await animate(
      element.value,
      { top: "50%", transform: "translateY(-50%)" },
      { duration: 0 },
    ).finished;

    transitioning.value = false;
  }
}

export async function slideDown(
  element: Signal<HTMLElement | undefined>,
  placeholder: Signal<string>,
  transitioning: Signal<boolean>,
  homeContextStore: HomeContextStore,
  elementType: "title" | "description" | "url",
) {
  let topValue;

  switch (elementType) {
    case "title":
      topValue = "54%";
      break;
    case "description":
      topValue = "50%";
      break;
    default:
      topValue = "50%";
  }

  if (element.value) {
    await animate(
      element.value,
      { top: "0%", transform: "translateY(0%)" },
      { easing: "ease-out", duration },
    ).finished;

    transitioning.value = true;
    placeholder.value =
      homeContextStore.slides[homeContextStore.captionPrevIndex][elementType];
    await timeout(1);

    await animate(
      element.value,
      { top: topValue, transform: "translateY(-50%)" },
      { duration: 0 },
    ).finished;

    transitioning.value = false;
  }
}
