import { component$, useStyles$ } from "@builder.io/qwik";
import WidgetContainer from "../WidgetContainer";
import styles from "./style.css?inline";

export interface NewsletterWidgetProps {
  title?: string;
  subscribersCount: number;
}

export default component$<NewsletterWidgetProps>((props) => {
  useStyles$(styles);
  return (
    <WidgetContainer title={props.title}>
      <form>
        <div>
          <div>
            <span class="newsletter-headline">Join 70,000 subscribers!</span>
            <div class="email-input">
              <input placeholder="Email address…" type="email" name="EMAIL" />
            </div>
            <button class="newsletter-button" type="submit">
              Sign Up
            </button>
            <span class="newsletter-privacy">
              By signing up, you agree to our <a href="#">Privacy Policy</a>
            </span>
          </div>
        </div>
        <label style="display: none !important;">
          Leave this field empty if you're human:{" "}
          <input
            type="text"
            name="_mc4wp_honeypot"
            value=""
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
        <input type="hidden" name="_mc4wp_timestamp" value="1679257245" />
        <input type="hidden" name="_mc4wp_form_id" value="96" />
        <input
          type="hidden"
          name="_mc4wp_form_element_id"
          value="mc4wp-form-1"
        />
        <div class="mc4wp-response"></div>
      </form>
    </WidgetContainer>
  );
});
