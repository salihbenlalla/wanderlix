import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import styles from "./style.css?inline";

export type ImageWithCaptionProps = {
  imgSrc: string;
  imgWidth: string;
  imgHeight: string;
};

const ImageWithCaption = component$((props: ImageWithCaptionProps) => {
  useStyles$(styles);
  //   const proportion: number = Number(props.imgWidth) / 700;
  //   const imgWidth = Number(props.imgWidth) / proportion;
  //   const imgHeight = Number(props.imgHeight) / proportion;
  return (
    <div class="image_caption">
      <img src={props.imgSrc} />
      <Slot />
    </div>
  );
});

export default ImageWithCaption;
