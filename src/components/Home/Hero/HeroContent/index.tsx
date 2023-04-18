import { component$, useStyles$ } from "@builder.io/qwik";
import SlickSlider from "./SlickSlider2";
import { type SlickSliderProps } from "./SlickSlider2";
import styles from "./style.css?inline";

const SlickSliderProps: SlickSliderProps = {
  slides: [
    {
      title: "Post 0",
      thumbnail: "/images/place1.jpg",
      description: "this is a description",
      //   url: "#",
      //   date: "26 August 2022",
      //   author: "John Doe",
      //   authorUrl: "#",
    },
    {
      title: "Post 1",
      thumbnail: "/images/place2.jpg",
      description: "this is a description",
      //   url: "#",
      //   date: "23 August 2022",
      //   author: "John Smith",
      //   authorUrl: "#",
    },
    {
      title: "Post 2",
      thumbnail: "/images/place3.jpg",
      description: "this is a description",
      //   url: "#",
      //   date: "23 August 2022",
      //   author: "matilda Smith",
      //   authorUrl: "#",
    },
    {
      title: "Post 3",
      thumbnail: "/images/place4.jpg",
      description: "this is a description",
      //   url: "#",
      //   date: "23 August 2022",
      //   author: "John Smith",
      //   authorUrl: "#",
    },
    {
      title: "Post 4",
      thumbnail: "/images/place5.jpg",
      description: "this is a description",
      //   url: "#",
      //   date: "23 August 2022",
      //   author: "John Smith",
      //   authorUrl: "#",
    },
    {
      title: "Post 5",
      thumbnail: "/images/place6.jpg",
      description: "this is a description",
      //   url: "#",
      //   date: "23 August 2022",
      //   author: "John Smith",
      //   authorUrl: "#",
    },
  ],
};

export default component$(() => {
  //   const currentIndex = useSignal<number>(props.currentIndex);
  useStyles$(styles);
  //   useVisibleTask$(({ track }) => {
  //     track(() => props.currentIndex);
  //     console.log("from HeroContent: ", currentIndex.value);
  //   });
  return (
    <div class="container">
      <div class="hero-content">
        <div class="hero-content-left">
          <h1>Africa</h1>
          <p>
            Embark on an unforgettable adventure with our travel guides to
            Africa's wildlife, landscapes, and history. Get inspired and start
            exploring now!
          </p>
          <button>
            Explore guides<span class="button-arrow">&rarr;</span>
          </button>
        </div>
        <div class="hero-content-right">
          <SlickSlider />
        </div>
      </div>
    </div>
  );
});

/*

Europe: "Discover Europe's charm with our expert travel guides. Get inspired for your next adventure!"
Asia: "Explore Asia's hidden gems with our travel guides to its temples, culture, and scenery. Start your journey today!"
Africa: "Embark on an unforgettable adventure with our travel guides to Africa's wildlife, landscapes, and history. Get inspired and start exploring now!"
North America: "Find your next adventure with our travel guides to North America's cities, wonders, and history. Be amazed by the beauty of this diverse continent and start planning your trip today!"
South America: "Experience the vibrancy of South America with our travel guides to its landscapes, culture, and history. Start planning your trip today and get inspired for your journey ahead!"
Australia: "Discover Australia's iconic landmarks, beaches, and wildlife with our travel guides. Let us inspire and guide you on your journey Down Under, from the Outback to the Great Barrier Reef!"
*/
