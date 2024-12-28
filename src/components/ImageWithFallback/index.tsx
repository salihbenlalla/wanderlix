import { component$, useSignal } from "@builder.io/qwik";
import { cn } from "~/lib/helpers/cn";
import {
  getHeight,
  getminHeight,
  getminWidth,
  getpb,
  getWidth,
} from "./dynamicClasses";

export const ImageWithFallback = component$<{
  src: string | undefined;
  alt: string;
  width: number;
  height: number;
  srcset?: string | undefined;
  loading: "lazy" | "eager";
  minWidth?: number;
  minHeight?: number;
  exactDimensions?: boolean;
  aspectRatio?: number | undefined; //use aspectRatio only when the image should take the full width of the parent element and should not be constrained by a max-width
  noFallback?: boolean;
}>(
  ({
    src,
    alt,
    width,
    height,
    srcset,
    loading,
    minWidth,
    minHeight,
    exactDimensions,
    aspectRatio,
    // noFallback,
  }) => {
    const isLoaded = useSignal(false); // Track if image is loaded successfully
    const imageContainerRef = useSignal<HTMLImageElement>();

    return (
      <div
        ref={imageContainerRef}
        class={cn("relative bg-stone-300", {
          "h-full w-full": !exactDimensions,
          ...getpb(aspectRatio),
          ...getWidth(width, exactDimensions),
          ...getHeight(height, exactDimensions),
          ...getminWidth(minWidth),
          ...getminHeight(minHeight),
        })}
      >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          srcset={srcset}
          loading={loading}
          class={cn("bg-40% block w-full bg-center bg-no-repeat object-cover", {
            "h-full": !aspectRatio,
            "absolute bottom-0 left-0 right-0 top-0 h-auto": !!aspectRatio,
            // "bg-[url('/camera.svg')]": !noFallback,
            "text-inherit": isLoaded.value,
            "indent-[-9999px] text-transparent": !isLoaded.value,
          })}
          onLoad$={() => (isLoaded.value = true)}
          onError$={() => (isLoaded.value = false)}
        />
      </div>
    );
  },
);
