import { component$, useSignal, useStyles$, useVisibleTask$ } from "@builder.io/qwik";
import SlickSlider, { type HomeCarouselProps } from "./SlickSlider";
import styles from "./style.css?inline";

const SlickSliderProps: HomeCarouselProps = {
  posts: [
    {
      title: "Post 0",
      url: "#",
      thumbnail: "/images/place1.jpg",
      date: "26 August 2022",
      author: "John Doe",
      authorUrl: "#",
    },
    {
      title: "Post 1",
      url: "#",
      thumbnail: "/images/place2.jpg",
      date: "23 August 2022",
      author: "John Smith",
      authorUrl: "#",
    },
    {
      title: "Post 2",
      url: "#",
      thumbnail: "/images/place3.jpg",
      date: "23 August 2022",
      author: "matilda Smith",
      authorUrl: "#",
    },
    {
      title: "Post 3",
      url: "#",
      thumbnail: "/images/place4.jpg",
      date: "23 August 2022",
      author: "John Smith",
      authorUrl: "#",
    },
    {
      title: "Post 4",
      url: "#",
      thumbnail: "/images/place5.jpg",
      date: "23 August 2022",
      author: "John Smith",
      authorUrl: "#",
    },
    {
      title: "Post 5",
      url: "#",
      thumbnail: "/images/place6.jpg",
      date: "23 August 2022",
      author: "John Smith",
      authorUrl: "#",
    },
  ],
  currentIndex: 0
};

interface HeroProps {
  currentIndex: number
}

export default component$<HeroProps>((props) => {
  const currentIndex = useSignal<number>(props.currentIndex)
  useStyles$(styles);
  useVisibleTask$(({track}) => {
    track(() => props.currentIndex)
    
  })
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
          <SlickSlider currentIndex={currentIndex.value} posts={SlickSliderProps.posts} />
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
