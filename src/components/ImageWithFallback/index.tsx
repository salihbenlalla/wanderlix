import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

export const ImageWithFallback = component$<{
  src: string | undefined;
  alt: string;
  width: number;
  height: number;
  srcset?: string | undefined;
  loading: "lazy" | "eager";
  minWidth?: number;
  minHeight?: number;
}>(({ src, alt, width, height, srcset, loading, minWidth, minHeight }) => {
  const isLoaded = useSignal(false); // Track if image is loaded successfully
  const shouldLoad = useSignal(loading === "eager"); // Control if image should load
  const imageContainerRef = useSignal<HTMLImageElement>()
  const imageContainerWidth = useSignal<number | undefined>();
  const imageContainerHeight = useSignal<number | undefined>();

  useVisibleTask$(() => {
    imageContainerWidth.value = imageContainerRef.value?.getBoundingClientRect().width;
    imageContainerHeight.value = imageContainerRef.value?.getBoundingClientRect().height;
    if (loading === "lazy") {
      shouldLoad.value = true; // Start loading when in view
    }
  });

  return (
    <div
      class="image-with-fallback-container"
      ref={imageContainerRef}
      style={{
        width: imageContainerWidth.value || "100%",
        height: imageContainerHeight.value || "100%",
        position: "relative",
        minWidth,
        minHeight
      }}
    >
      {/* SVG Fallback (Visible initially) */}
      {!isLoaded.value && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          style={{
            width: "50%",
            height: "50%",
            top: `50%`,
            left: `50%`,
            transform: "translate(-50%, -50%)",
            position: "absolute",
            fill: "#090f161a"
          }}
        >
          <title>camera</title>
          <path d="M0 6c0-1.1 0.9-2 2-2h3l2-2h6l2 2h3c1.105 0 2 0.895 2 2v0 10c0 1.105-0.895 2-2 2v0h-16c-1.105 0-2-0.895-2-2v0-10zM10 16c2.761 0 5-2.239 5-5s-2.239-5-5-5v0c-2.761 0-5 2.239-5 5s2.239 5 5 5v0zM10 14c-1.657 0-3-1.343-3-3s1.343-3 3-3v0c1.657 0 3 1.343 3 3s-1.343 3-3 3v0z"></path>
        </svg>
      )}

      {/* Load image only if shouldLoad is true */}
      {shouldLoad.value && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          srcset={srcset}
          loading="eager"
          style={{
            display: isLoaded.value ? "block" : "none",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          onLoad$={() => (isLoaded.value = true)}
          onError$={() => (isLoaded.value = false)}
        />
      )}
    </div>
  );
});
