import {
  component$,
  useSignal,
  useStore,
  useStyles$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { isBrowser } from "@builder.io/qwik/build";
import { animate } from "motion";
import styles from "./style.css?inline";

export interface CarouselItemProps {
  title: string;
  thumbnail?: string;
  url: string;
  translateValue: number;
  direction: "next" | "prev" | null;
  itemWidth: number;
  //   author?: string;
  //   authorUrl?: string;
  //   date?: string;
}

export default component$<CarouselItemProps>((props) => {
  useStyles$(styles);
  const fixup =
    props.direction === "next"
      ? props.itemWidth
      : props.direction === "prev"
      ? -props.itemWidth
      : 0;

  const store = useStore({
    translateValue: props.translateValue,
  });

  const liRef = useSignal<HTMLLIElement>();

  useVisibleTask$(({ track }) => {
    track(props);
    if (isBrowser) {
      if (liRef.value) {
        animate(
          liRef.value,
          {
            transform: `translate3d(${props.translateValue}px, 0, 0)`,
          },
          {
            duration: 0.6,
          }
        );
      }
    }
  });

  const liStyle = () => {
    return {
      transform: `translate3d(${store.translateValue + fixup}px, 0, 0)`,
      //   width: "100%",
      width: `${props.itemWidth - 10}px`,
      margin: `0 10px`,
    };
  };

  return (
    <li ref={liRef} style={liStyle()}>
      <div class="hero-slick-slider-post-thumbnail">
        <a href={props.url}>
          <div class="hero-slick-slider-post-thumbnail-inner">
            <img src={props.thumbnail} alt={props.title} />
          </div>
        </a>
      </div>
      <div class="hero-slick-slider-post-details">
        <a href={props.url}>
          <h6 class="hero-slick-slider-post-title">{props.title}</h6>
        </a>
        {/* <ul class="hero-slick-slider-post-meta">
          <li>
            <a href={props.authorUrl}>{props.author}</a>
          </li>
          <li>{props.date}</li>
        </ul> */}
      </div>
    </li>
  );
});
