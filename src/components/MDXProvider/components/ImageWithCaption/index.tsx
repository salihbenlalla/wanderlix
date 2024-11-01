import {
  $,
  component$,
  Slot,
  useSignal,
  useStyles$,
  useTask$,
} from "@builder.io/qwik";
import { getSrcSet, type ImageTransformerProps } from "qwik-image";
import styles from "./style.css?inline";
import { ImageWithFallback } from "~/components/ImageWithFallback";

export type ImageWithCaptionProps = {
  imgSrc: string;
  imgWidth: string;
  imgHeight: string;
};

const ImageWithCaption = component$((props: ImageWithCaptionProps) => {
  useStyles$(styles);

  const imgHeight = Number(props.imgHeight);
  const imgWidth = Number(props.imgWidth);

  const srcSet = useSignal<string | undefined>();

  const imageTransformer$ = $(
    ({ src, width, height }: ImageTransformerProps): string => {
      return `/images/${width}/${height}/${src.split("/")[4]}`;
    }
  );


  useTask$(async ({ track }) => {
    track(() => props.imgSrc)
    const imgSrc = `/images/${props.imgWidth}/${props.imgHeight}/${props.imgSrc.split("/")[4]}`;
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
    <div class="image_caption">
      {/*
      <Image
        layout="fullWidth"
        objectFit="fill"
        aspectRatio={imgWidth / imgHeight}
        width={imgWidth}
        //@ts-ignore
        height="auto"
        alt="alt text"
        placeholder="#e6e6e6"
        src={props.imgSrc}
        loading="lazy"
      />
      */}

      <ImageWithFallback
        aspectRatio={imgHeight / imgWidth}
        width={imgWidth}
        //@ts-ignore
        height={imgHeight}
        alt="alt text"
        src={`/images/${props.imgWidth}/${props.imgHeight}/${props.imgSrc.split("/")[4]}`}
        srcset={srcSet.value}
        loading="lazy"
      />
      <Slot />
    </div>
  );
});

export default ImageWithCaption;
