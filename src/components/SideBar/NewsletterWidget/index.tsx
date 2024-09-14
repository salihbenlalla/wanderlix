import {
  component$,
  useStyles$,
  $,
  type QRL,
  useContext,
  useSignal,
} from "@builder.io/qwik";
import WidgetContainer from "../WidgetContainer";
import styles from "./style.css?inline";
import { Link } from "@builder.io/qwik-city";
import { email, minLength, object, string } from "valibot";
import {
  useForm,
  valiForm$,
  reset,
  type SubmitHandler,
} from "@modular-forms/qwik";
import { ThemeContext } from "~/routes/layout";
import { type AddSubscriberReturnValue } from "~/routes/newsletter/handleAddSubscriber";

export interface NewsletterFormInput {
  email: string;
  [key: string]: string;
}

export interface NewsletterWidgetProps {
  title?: string;
  subscribersCount: number;
}

const newsletterFormSchema = object({
  email: string([
    minLength(1, "Please enter your email."),
    email("The email address is badly formatted."),
  ]),
});

export default component$<NewsletterWidgetProps>((props) => {
  useStyles$(styles);

  const theme = useContext(ThemeContext);

  const newsletterFormLoader = useSignal<NewsletterFormInput>({
    email: "",
  });

  const [newsletterForm, { Form, Field }] = useForm<NewsletterFormInput>({
    loader: newsletterFormLoader,
    fieldArrays: [],
    validate: valiForm$(newsletterFormSchema),
  });

  const resetForm = $(() => {
    reset(newsletterForm);
  });

  const handleSubmit: QRL<SubmitHandler<NewsletterFormInput>> = $(
    async (values, _ /*event*/) => {
      try {
        const response = await fetch("/newsletter/", {
          method: "POST",
          body: JSON.stringify(values),
        });

        const responseBody =
          (await response.json()) as AddSubscriberReturnValue;

        if (response.status === 200) {
          resetForm();

          theme.toast.isVisible = true;
          theme.toast.type = "success";
        } else {
          theme.toast.isVisible = true;
          theme.toast.type = "error";
        }

        theme.toast.message = responseBody.message;
      } catch (error) {
        console.log(error);
        theme.toast.isVisible = true;
        theme.toast.type = "error";
        theme.toast.message = "something went wrong.";
      }
    }
  );

  return (
    <WidgetContainer title={props.title}>
      <Form onSubmit$={handleSubmit} id="contactform" class="contact-form">
        <div>
          <div>
            <span class="newsletter-headline">Join 70,000 subscribers!</span>
            <div class="email-input">
              <Field name="email">
                {(field, props) => (
                  <>
                    <input
                      {...props}
                      value={field.value}
                      type="email"
                      id="email"
                      placeholder="Email address…"
                      class={field.error ? "error" : ""}
                      aria-describedby="email-notes"
                      size={30}
                      maxLength={100}
                      autoComplete="email"
                      required
                    />
                    <div class="newsletter-form-error-message">
                      {field.error && <span>{field.error}</span>}
                    </div>
                  </>
                )}
              </Field>
            </div>
            <button class="newsletter-button" type="submit">
              Sign Up
            </button>
            <span class="newsletter-privacy">
              By signing up, you agree to our{" "}
              <Link href="/privacy-policy/">Privacy Policy</Link>
            </span>
          </div>
        </div>
      </Form>
    </WidgetContainer>
  );
});
