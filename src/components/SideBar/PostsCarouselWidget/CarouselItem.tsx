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
}

const getRealTranslate = (
  translateValue: number,
  fixup: number,
  direction: "next" | "prev" | null
) => {
  if (direction === "next") {
    return translateValue + fixup < -636 ? 318 : translateValue + fixup;
  }

  if (direction === "prev") {
    return translateValue + fixup > 318 ? -636 : translateValue + fixup;
  }
  return translateValue + fixup;
};

export default component$<CarouselItemProps>((props) => {
  // const translateValue = useSignal<number>(0);

  const fixup =
    props.direction === "next" ? -318 : props.direction === "prev" ? 318 : 0;

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
            transform: `translate3d(${getRealTranslate(
              props.translateValue,
              fixup,
              props.direction
            )}px, 0, 0)`,
          },
          {
            duration: 0.6,
          }
        ).finished.then(() => {
          store.translateValue = getRealTranslate(
            props.translateValue,
            fixup,
            props.direction
          );
        });

        if (
          getRealTranslate(props.translateValue, fixup, props.direction) ===
            318 ||
          getRealTranslate(props.translateValue, fixup, props.direction) ===
            -616
        ) {
          animate(
            liRef.value,
            {
              opacity: 0,
            },
            {
              duration: 0,
            }
          ).finished.then(() => {
            if (liRef.value) {
              animate(liRef.value, { opacity: 1 }, { duration: 0, delay: 0.6 });
            }
          });
        }
      }
    }
  });

  const liStyle = () => {
    console.log(store.translateValue);
    return {
      transform: `translate3d(${store.translateValue}px, 0, 0)`,
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
          <li>translate value: {store.translateValue}</li>
        </ul>
      </div>
    </li>
  );
});
