import { component$, useStyles$ } from "@builder.io/qwik";
import styles from "./style.css?inline";

type ElementProps = {
  [key: string]: any;
};

const ImageAd = component$((props: ElementProps) => {
  useStyles$(styles);
  return (
    <div class="image_ad">
      <a href={props.aHref} target="_blank" rel="nofollow noopener noreferrer">
        <img src={props.imgSrc} loading="lazy" alt="" />
      </a>
    </div>
  );
});

export default ImageAd;
