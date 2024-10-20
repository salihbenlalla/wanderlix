import { type HomeContextStore } from "~/components/Home";

export function changeIndex(homeContextStore: HomeContextStore) {
  if (homeContextStore.direction === "next") {
    //go to next index
    homeContextStore.captionCurrentIndex =
      homeContextStore.captionCurrentIndex ===
      homeContextStore.slides.length - 1
        ? 0
        : homeContextStore.captionCurrentIndex + 1;

    homeContextStore.captionPrevIndex =
      homeContextStore.captionCurrentIndex === 0
        ? homeContextStore.slides.length - 1
        : homeContextStore.captionCurrentIndex - 1;
    homeContextStore.captionNextIndex =
      homeContextStore.captionCurrentIndex ===
      homeContextStore.slides.length - 1
        ? 0
        : homeContextStore.captionCurrentIndex + 1;
  }

  if (homeContextStore.direction === "prev") {
    //go to previous index
    homeContextStore.captionCurrentIndex =
      homeContextStore.captionCurrentIndex === 0
        ? homeContextStore.slides.length - 1
        : homeContextStore.captionCurrentIndex - 1;

    homeContextStore.captionPrevIndex =
      homeContextStore.captionCurrentIndex === 0
        ? homeContextStore.slides.length - 1
        : homeContextStore.captionCurrentIndex - 1;
    homeContextStore.captionNextIndex =
      homeContextStore.captionCurrentIndex ===
      homeContextStore.slides.length - 1
        ? 0
        : homeContextStore.captionCurrentIndex + 1;
  }
}
