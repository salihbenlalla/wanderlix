import {
  component$,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { animate } from "motion";
// import { Image } from "qwik-image";

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
        <Link href={props.url}>
          <div class="carousel-post-thumbnail-inner">
            <img
              src={props.thumbnail}
              alt={props.title}
              loading="lazy"
              width={Math.round(props.imageWidth / 4)}
              height={Math.round(props.imageHeight / 4)}
            />
            {/* <Image
              layout="fullWidth"
              objectFit="cover"
              // aspectRatio={298 / 200}
              width={298}
              height={200}
              alt={props.title}
              placeholder="#e6e6e6"
              src={props.thumbnail}
              loading="lazy"
            /> */}
          </div>
        </Link>
      </div>
      <div class="carousel-post-details">
        <Link href={props.url}>
          <h4 class="carousel-post-title">{props.title}</h4>
        </Link>
        <ul class="carousel-post-meta">
          <li>
            <Link href={`/author/${props.authorUrl}`}>{props.author}</Link>
          </li>
          <li>{props.date}</li>
        </ul>
      </div>
    </li>
  );
});
