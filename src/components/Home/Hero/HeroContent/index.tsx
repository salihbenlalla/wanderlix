import { component$, useStyles$ } from "@builder.io/qwik";
import SlickSlider from "./SlickSlider";
import styles from "./style.css?inline";

export default component$(() => {
  useStyles$(styles);

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
            DISCOVER LOCATION
            {/* <span class="button-arrow">&rarr;</span> */}
          </button>
        </div>
        <div class="hero-content-right">
          <SlickSlider slideWidth={150} slideHeight={200} margin={10} />
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
