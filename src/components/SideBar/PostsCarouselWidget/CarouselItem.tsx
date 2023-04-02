import {
  component$,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { isBrowser } from "@builder.io/qwik/build";
import { animate } from "motion";

export interface CarouselItemProps {
  title: string;
  thumbnail?: string;
  date?: string;
  url: string;
  author?: string;
  authorUrl?: string;
  translateValue: number;
  direction: "next" | "prev" | null;
  itemWidth: number;
}

export default component$<CarouselItemProps>((props) => {
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
    };
  };

  return (
    <li ref={liRef} style={liStyle()}>
      <div class="carousel-post-thumbnail">
        <a href={props.url}>
          <div class="carousel-post-thumbnail-inner">
            <img src={props.thumbnail} alt={props.title} />
          </div>
        </a>
      </div>
      <div class="carousel-post-details">
        <a href={props.url}>
          <h6 class="carousel-post-title">{props.title}</h6>
        </a>
        <ul class="carousel-post-meta">
          <li>
            <a href={props.authorUrl}>{props.author}</a>
          </li>
          <li>{props.date}</li>
        </ul>
      </div>
    </li>
  );
});
