import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./style.css?inline";

type ElementProps = {
  [key: string]: any;
};

const ImageAd = component$((props: ElementProps) => {
  useStylesScoped$(styles);
  return (
    <a href={props.aHref} target="_blank" rel="nofollow noopener noreferrer">
      <img src={props.imgSrc} loading="lazy" alt="" />
    </a>
  );
});

export default ImageAd;
