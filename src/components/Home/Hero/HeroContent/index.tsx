import {
  component$,
  useContext,
  useSignal,
  useStyles$,
  useVisibleTask$,
} from "@builder.io/qwik";
import SlickSlider from "./SlickSlider";
import styles from "./style.css?inline";
import HeroCaption from "./HeroCaption";
import { homeContext } from "../../HomeContext";
import { animate } from "motion";

export default component$(() => {
  useStyles$(styles);

  const slideWidth = useSignal(170);
  const slideHeight = useSignal(230);

  useVisibleTask$(() => {
    if (window.innerHeight <= 700 && window.innerWidth < 992) {
      slideHeight.value = 0.28 * window.innerHeight;
      slideWidth.value = 0.2 * window.innerHeight;
    }
  });

  const HomeContextStore = useContext(homeContext);
  const leftRef = useSignal<HTMLDivElement>();
  const rightRef = useSignal<HTMLDivElement>();

  useVisibleTask$(({ track }) => {
    track(() => HomeContextStore.currentSectionIndex);

    if (HomeContextStore.currentSectionIndex === 1) {
      if (leftRef.value) {
        animate(
          leftRef.value,
          { transform: `translate3d(-100%, 0, 0)`, opacity: 0 },
          { duration: 1.5 }
        );
      }
      if (rightRef.value) {
        animate(
          rightRef.value,
          {
            transform: `translate3d(100%, 0, 0)`,
            opacity: 0,
          },
          {
            duration: 1.5,
          }
        );
      }
    }

    if (HomeContextStore.currentSectionIndex === 0) {
      //@ts-ignore
      clearTimeout(window.scrollTimeout2);
      //@ts-ignore
      window.scrollTimeout2 = setTimeout(() => {
        if (leftRef.value) {
          animate(
            leftRef.value,
            { transform: `translate3d(0, 0, 0)`, opacity: 1 },
            { duration: 1.5 }
          );
        }
        if (rightRef.value) {
          animate(
            rightRef.value,
            {
              transform: `translate3d(0, 0, 0)`,
              opacity: 1,
            },
            {
              duration: 1.5,
            }
          );
        }
      }, 500);
    }
  });

  return (
    <div class="container">
      <div class="hero-content">
        <div ref={leftRef} class="hero-content-left">
          <HeroCaption />
        </div>
        <div ref={rightRef} class="hero-content-right">
          <SlickSlider
            slideWidth={slideWidth.value}
            slideHeight={slideHeight.value}
            margin={10}
          />
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
