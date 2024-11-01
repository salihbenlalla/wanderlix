import { component$, useSignal } from "@builder.io/qwik";

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
  aspectRatio?: number | undefined;  //use aspectRatio only when the image should take the full width of the parent element and should not be constrained by a max-width
  noFallback?: boolean
}>(({ src, alt, width, height, srcset, loading, minWidth, minHeight, exactDimensions, aspectRatio, noFallback }) => {
  const isLoaded = useSignal(false); // Track if image is loaded successfully
  const imageContainerRef = useSignal<HTMLImageElement>()

  return (
    <div
      class="image-with-fallback-container"
      ref={imageContainerRef}
      style={{
        background: "#090f161a",
        width: exactDimensions ? width : "100%",
        height: exactDimensions ? height : "100%",
        position: "relative",
        paddingBottom: exactDimensions || !aspectRatio ? undefined : `${aspectRatio * 100}%`,
        minWidth,
        minHeight
      }}
    >

      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        srcset={srcset}
        loading={loading}
        style={{
          display: "block",
          width: "100%",
          objectFit: "cover",
          height: !aspectRatio ? "100%" : "auto", // Change height behavior based on objectFit
          position: !aspectRatio ? undefined : "absolute", // Allow for absolute positioning when not using objectFit
          top: !aspectRatio ? undefined : 0,
          left: !aspectRatio ? undefined : 0,
          bottom: !aspectRatio ? undefined : 0,
          right: !aspectRatio ? undefined : 0,
          backgroundImage: noFallback ? undefined : `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="%23090f161a"><title>camera</title><path d="M0 6c0-1.1 0.9-2 2-2h3l2-2h6l2 2h3c1.105 0 2 0.895 2 2v0 10c0 1.105-0.895 2-2 2v0h-16c-1.105 0-2-0.895-2-2v0-10zM10 16c2.761 0 5-2.239 5-5s-2.239-5-5-5v0c-2.761 0-5 2.239-5 5s2.239 5 5 5v0zM10 14c-1.657 0-3-1.343-3-3s1.343-3 3-3v0c1.657 0 3 1.343 3 3s-1.343 3-3 3v0z"></path></svg>')`,
          backgroundSize: "40%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          color: isLoaded.value ? "inherit" : "transparent", // Hide alt text initially
          textIndent: isLoaded.value ? 0 : "-9999px",
        }}
        onLoad$={() => (isLoaded.value = true)}
        onError$={() => (isLoaded.value = false)}
      />
    </div>
  );
});
