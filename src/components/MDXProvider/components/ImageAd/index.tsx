import { component$, useStyles$ } from "@builder.io/qwik";
import { Image } from "qwik-image";
import styles from "./style.css?inline";

type ElementProps = {
  aHref: string;
  imgSrc: string;
  imgHeight: string | undefined;
  imgWidth: string | undefined;
};

const ImageAd = component$((props: ElementProps) => {
  useStyles$(styles);

  const imgHeight = Number(props.imgHeight) || 800;
  const imgWidth = Number(props.imgWidth) || 1280;
  const imgSrc = `/images/${imgWidth}/${imgHeight}/${props.imgSrc}`

  return (
    <div class="image_ad">
      <a href={props.aHref} target="_blank" rel="nofollow noopener noreferrer">
        <Image
          layout="fullWidth"
          objectFit="fill"
          aspectRatio={imgWidth / imgHeight}
          width={imgWidth}
          //@ts-ignore
          height="auto"
          alt="alt text"
          placeholder="#e6e6e6"
          src={imgSrc}
          loading="lazy"
        />
      </a>
    </div>
  );
});

export default ImageAd;
