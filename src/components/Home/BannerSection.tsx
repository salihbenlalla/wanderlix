import { component$, useStylesScoped$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { LocationIcon } from "../icons/LocationIcon";
import { CalendarInIcon } from "../icons/CalendarInIcon";
import styles from "./banner.css";
import { CalendarOutIcon } from "../icons/CalendarOutIcon";
import { VerticalRule } from "../icons/VerticalRule";
import { ArrowForward } from "../icons/ArrowForward";

export default component$(() => {
  useStylesScoped$(styles);
  return (
    <section class="banner_section">
      <div class="banner_section__content">
        <h1>Your world of joy</h1>
        <p>Find what makes you happy anytime, anywhere</p>
        <div class="banner_section__form">
          <form>
            <div class="form_control">
              <div class="form_control__icon">
                <LocationIcon />
              </div>
              <div class="form_control_entry">
                <label for="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Where are you going?"
                />
              </div>
            </div>
            <VerticalRule />
            <div class="form_date_range">
              <div class="form_control">
                <div class="form_control__icon">
                  <CalendarInIcon />
                </div>
                <div class="form_control_entry">
                  <label for="date">Date</label>
                  <input
                    type="text"
                    id="date"
                    name="date"
                    placeholder="Add date"
                  />
                </div>
              </div>
              <div class="form_control">
                <ArrowForward />
              </div>
              <div class="form_control">
                <div class="form_control__icon">
                  <CalendarOutIcon />
                </div>
                <div class="form_control_entry">
                  <label for="checkout">Check out</label>
                  <input
                    type="text"
                    id="checkout"
                    name="checkout"
                    placeholder="Add date"
                  />
                </div>
              </div>
            </div>
            <VerticalRule />
            <div class="form_button">
              <button>Search</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Home",
};
