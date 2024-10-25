import {
  component$,
  Slot,
  useStyles$,
} from "@builder.io/qwik";
import { Image } from "qwik-image";
import styles from "./style.css?inline";

export type ImageWithCaptionProps = {
  imgSrc: string;
  imgWidth: string;
  imgHeight: string;
};

const ImageWithCaption = component$((props: ImageWithCaptionProps) => {
  useStyles$(styles);

  const imgHeight = Number(props.imgHeight);
  const imgWidth = Number(props.imgWidth);

  return (
    <div class="image_caption">
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
      <Slot />
    </div>
  );
});

export default ImageWithCaption;
