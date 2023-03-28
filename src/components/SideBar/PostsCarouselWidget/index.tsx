import { component$, useSignal, useStore, useStyles$ } from "@builder.io/qwik";
// import { isBrowser } from "@builder.io/qwik/build";
import { v4 as uuidv4 } from "uuid";
import WidgetContainer from "../WidgetContainer";
import styles from "./style.css?inline";
import CheveronRight from "/src/assets/icomoon_svg/cheveron-right.svg?component";
import CheveronLeft from "/src/assets/icomoon_svg/cheveron-left.svg?component";

export interface CarouselPost {
  title: string;
  thumbnail?: string;
  date?: string;
  url: string;
  author?: string;
  authorUrl?: string;
}

export interface PostsCarouselWidgetProps {
  title?: string;
  posts: CarouselPost[];
}

interface Store {
  posts: CarouselPost[];
  numbers: number[];
}

declare global {
  interface Window {
    timer?: ReturnType<typeof window.setTimeout>;
  }
}

export default component$<PostsCarouselWidgetProps>((props) => {
  useStyles$(styles);

  const store = useStore<Store>(
    {
      posts: [...props.posts],
      numbers: [...Array(props.posts.length).keys()],
    },
    { deep: true }
  );
  //   const movingLeft = useSignal(false);
  //   const movingRight = useSignal(false);

  const ulRef = useSignal<HTMLUListElement>();

  return (
    <WidgetContainer title={props.title}>
      {store.posts.length && (
        <>
          <div class="carousel-posts-container">
            <ul class={`carousel-posts-list`} ref={ulRef}>
              {store.numbers.map((num) => {
                return (
                  <li key={`carousel-post-${uuidv4()}`}>
                    <div class="carousel-post-thumbnail">
                      <a href={props.posts[num].url}>
                        <div class="carousel-post-thumbnail-inner">
                          <img
                            src={props.posts[num].thumbnail}
                            alt={props.posts[num].title}
                          />
                        </div>
                      </a>
                    </div>
                    <div class="carousel-post-details">
                      <a href={props.posts[num].url}>
                        <h6 class="carousel-post-title">
                          {props.posts[num].title}
                        </h6>
                      </a>
                      <ul class="carousel-post-meta">
                        <li>
                          <a href={props.posts[num].authorUrl}>
                            {props.posts[num].author}
                          </a>
                        </li>
                        <li>{props.posts[num].date}</li>
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div class="carousel-arrows">
            <button
              class="carousel-arrow-left"
              onClick$={() => {
                // movingRight.value = true;

                ulRef.value?.classList.add("move-right");
                if (window.timer) clearTimeout(window.timer);
                window.timer = setTimeout(() => {
                  const lastNum = store.numbers.pop();
                  if (typeof lastNum === "number") {
                    store.numbers.unshift(lastNum);
                  }
                  ulRef.value?.classList.remove("move-right");
                }, 400);
              }}
            >
              <CheveronLeft />
            </button>
            <button
              class="carousel-arrow-right"
              onClick$={() => {
                // movingLeft.value = true;
                ulRef.value?.classList.add("move-left");
                if (window.timer) clearTimeout(window.timer);
                window.timer = setTimeout(() => {
                  const firstNum = store.numbers.shift();
                  if (typeof firstNum === "number") {
                    store.numbers.push(firstNum);
                  }
                  ulRef.value?.classList.remove("move-left");
                }, 400);
              }}
            >
              <CheveronRight />
            </button>
          </div>
        </>
      )}
    </WidgetContainer>
  );
});
