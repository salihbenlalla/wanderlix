import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import { Image } from "qwik-image";
import styles from "./style.css?inline";
import svgxImport from "@svgx-dir:/src/assets/icomoon_svg";

export interface MainPaysProps {
  title?: string;
  link?: string;
  imgSrc?: string;
  imgWidth?: string;
  imgHeight?: string;
}

const MainPays = component$<MainPaysProps>((props) => {
  useStyles$(styles);
  const SVGIcon = svgxImport("cheveron-right");
  return (
    <div class="read_more_card">
      <div class="read_more_card_title">{props.title}</div>
      <a href={props.link}>
        {/* <img
          width={props.imgWidth}
          height={props.imgHeight}
          src={props.imgSrc}
        /> */}

        <Image
          layout="fullWidth"
          objectFit="cover"
          aspectRatio={Number(props.imgWidth) / Number(props.imgHeight)}
          //@ts-ignore
          width={parseInt(props.imgWidth || "") || "auto"}
          //@ts-ignore 
          height="auto"
          alt="alt text"
          placeholder="#e6e6e6"
          src={props.imgSrc}
          loading="lazy"
        />
        <span class="read_more_card_content">
          <Slot />
        </span>
        <span class="read_more_card_svg_wrapper">
          <SVGIcon class="icon_svg" viewBox="2 3 16 16" />
        </span>
      </a>
    </div>
  );
});

export default MainPays;
