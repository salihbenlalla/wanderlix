import {
  component$,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { animate } from "motion";
import { ImageWithFallback } from "~/components/ImageWithFallback";

export interface CarouselItemProps {
  title: string;
  thumbnail?: string;
  imageWidth: number;
  imageHeight: number;
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

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(props);
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
            <ImageWithFallback
              src={props.thumbnail}
              alt={props.title}
              loading="lazy"
              width={Math.round(props.imageWidth / 4)}
              height={Math.round(props.imageHeight / 4)}
              minWidth={244}
              minHeight={163}
            />
          </div>
        </a>
      </div>
      <div class="carousel-post-details">
        <a href={props.url}>
          <h4 class="carousel-post-title">{props.title}</h4>
        </a>
        <ul class="carousel-post-meta">
          <li>
            <a href={`/author/${props.authorUrl}`}>{props.author}</a>
          </li>
          <li>{props.date}</li>
        </ul>
      </div>
    </li>
  );
});
