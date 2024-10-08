import { type HomeContextStore } from "~/components/Home";

export const changeGeneralIndex = (
  homeContextStore: HomeContextStore,
  direction: "prev" | "next" | undefined,
) => {
  if (direction === "prev") {
    homeContextStore.generalIndex =
      homeContextStore.generalIndex + 1 === homeContextStore.slides.length
        ? 0
        : homeContextStore.generalIndex + 1;
    homeContextStore.direction = "prev";
  }
  if (direction === "next") {
    homeContextStore.generalIndex =
      homeContextStore.generalIndex === 0
        ? homeContextStore.slides.length - 1
        : homeContextStore.generalIndex - 1;
    homeContextStore.direction = "next";
  }
};
