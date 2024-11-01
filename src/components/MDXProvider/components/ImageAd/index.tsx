import { $, component$, useSignal, useStyles$, useTask$ } from "@builder.io/qwik";
import styles from "./style.css?inline";
import { ImageWithFallback } from "~/components/ImageWithFallback";
import { type ImageTransformerProps, getSrcSet } from "qwik-image";

type ImageAdProps = {
  aHref: string;
  imgSrc: string;
  imgHeight: string | undefined;
  imgWidth: string | undefined;
};

const ImageAd = component$((props: ImageAdProps) => {
  useStyles$(styles);

  const imgHeight = Number(props.imgHeight) || 800;
  const imgWidth = Number(props.imgWidth) || 1280;

  const srcSet = useSignal<string | undefined>();

  const imageTransformer$ = $(
    ({ src, width, height }: ImageTransformerProps): string => {
      return `/images/${width}/${height}/${src.split("/")[4]}`;
    }
  );


  useTask$(async ({ track }) => {
    track(() => props.imgSrc)
    const imgSrc = `/images/${imgWidth}/${imgHeight}/${props.imgSrc}`
    srcSet.value = await getSrcSet({
      src: imgSrc,
      width: imgWidth,
      height: imgHeight,
      layout: "fullWidth",
      resolutions: [1280, 960, 640, 320, 160],
      aspectRatio:
        imgWidth && imgHeight
          ? imgWidth / imgHeight
          : undefined,
      imageTransformer$,
    });
  });

  return (
    <div class="image_ad">
      <a href={props.aHref} target="_blank" rel="nofollow noopener noreferrer">
        <ImageWithFallback
          width={imgWidth}
          height={imgHeight}
          alt="alt text"
          src={`/images/${imgWidth}/${imgHeight}/${props.imgSrc}`}
          srcset={srcSet.value}
          loading="lazy"
        />
      </a>
    </div>
  );
});

export default ImageAd;
