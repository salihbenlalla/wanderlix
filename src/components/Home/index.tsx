import { component$, useStyles$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
// import HomeCarousel, { type HomeCarouselProps } from "./HomeCarousel";
import Hero from "./Hero";
import styles from "./index.css?inline";

// const postsCarousel: HomeCarouselProps = {
//   posts: [
//     {
//       title: "Post 0",
//       url: "#",
//       thumbnail: "/images/place1.jpg",
//       date: "26 August 2022",
//       author: "John Doe",
//       authorUrl: "#",
//     },
//     {
//       title: "Post 1",
//       url: "#",
//       thumbnail: "/images/place2.jpg",
//       date: "23 August 2022",
//       author: "John Smith",
//       authorUrl: "#",
//     },
//     {
//       title: "Post 2",
//       url: "#",
//       thumbnail: "/images/place3.jpg",
//       date: "23 August 2022",
//       author: "matilda Smith",
//       authorUrl: "#",
//     },
//     {
//       title: "Post 3",
//       url: "#",
//       thumbnail: "/images/place4.jpg",
//       date: "23 August 2022",
//       author: "John Smith",
//       authorUrl: "#",
//     },
//     {
//       title: "Post 4",
//       url: "#",
//       thumbnail: "/images/place5.jpg",
//       date: "23 August 2022",
//       author: "John Smith",
//       authorUrl: "#",
//     },
//     {
//       title: "Post 4",
//       url: "#",
//       thumbnail: "/images/place6.jpg",
//       date: "23 August 2022",
//       author: "John Smith",
//       authorUrl: "#",
//     },
//   ],
// };

// const images = [
//   "/images/place1.jpg",
//   "/images/place2.jpg",
//   "/images/place3.jpg",
//   "/images/place4.jpg",
//   "/images/place5.jpg",
//   "/images/place6.jpg",
// ];

export default component$(() => {
  useStyles$(styles);
  return (
    <>
      <div>
        <Hero />
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Home",
};
