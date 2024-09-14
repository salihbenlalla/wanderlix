import {
  $,
  type QRL,
  component$,
  useContext,
  useStyles$,
  useSignal,
} from "@builder.io/qwik";
import styles from "./style.css?inline";
import { ThemeContext } from "~/routes/layout";
import { email, type Input, minLength, object, string } from "valibot";
import {
  useForm,
  valiForm$,
  reset,
  type SubmitHandler,
} from "@modular-forms/qwik";

const ContactFormSchema = object({
  senderName: string([minLength(1, "Please enter your name.")]),
  email: string([
    minLength(1, "Please enter your email."),
    email("The email address is badly formatted."),
  ]),
  subject: string([minLength(1, "Please enter the subject.")]),
  messageText: string([minLength(1, "Please enter your message's text.")]),
});

export type ContactFormInput = Input<typeof ContactFormSchema>;

export default component$(() => {
  useStyles$(styles);

  const theme = useContext(ThemeContext);

  const formLoader = useSignal<ContactFormInput>({
    senderName: "",
    email: "",
    subject: "",
    messageText: "",
  });

  const [messageForm, { Form, Field }] = useForm<ContactFormInput>({
    loader: formLoader,
    fieldArrays: [],
    validate: valiForm$(ContactFormSchema),
  });

  const resetForm = $(() => {
    reset(messageForm);
  });

  const handleSubmit: QRL<SubmitHandler<ContactFormInput>> = $(
    async (values, _ /*event*/) => {
      try {
        const response = await fetch("/contact/message", {
          method: "POST",
          body: JSON.stringify(values),
        });

        if (response.status === 200) {
          resetForm();

          theme.toast.isVisible = true;
          theme.toast.type = "success";
          theme.toast.message = "message sent seccessfuly.";
        } else {
          theme.toast.isVisible = true;
          theme.toast.type = "error";
          theme.toast.message = "something went wrong.";
        }
      } catch (error) {
        console.log(error);
        theme.toast.isVisible = true;
        theme.toast.type = "error";
        theme.toast.message = "something went wrong.";
      }
    }
  );

  return (
    <Form onSubmit$={handleSubmit} id="contactform" class="contact-form">
      {/* <p class="comment-notes">
        Your email address will not be published. Required fields are marked *
      </p> */}
      <div class="contact-form-first-row">
        <div class="contact-form-author contact-form-field">
          {/* <label for="senderName">Your name *</label> */}
          <Field name="senderName">
            {(field, props) => (
              <>
                <input
                  {...props}
                  value={field.value}
                  disabled={theme.userInfoRemembered}
                  type="text"
                  id="senderName"
                  class={field.error ? "error" : ""}
                  size={30}
                  maxLength={245}
                  placeholder="Your name"
                  autoComplete="name"
                  required
                />
                <div class="contact-form-error-message">
                  {field.error && <span>{field.error}</span>}
                </div>
              </>
            )}
          </Field>
        </div>

        <div class="contact-form-email contact-form-field">
          {/* <label for="email">Email address *</label> */}
          <Field name="email">
            {(field, props) => (
              <>
                <input
                  {...props}
                  value={field.value}
                  disabled={theme.userInfoRemembered}
                  type="email"
                  id="email"
                  placeholder="Email address"
                  class={field.error ? "error" : ""}
                  aria-describedby="email-notes"
                  size={30}
                  maxLength={100}
                  autoComplete="email"
                  required
                />
                <div class="contact-form-error-message">
                  {field.error && <span>{field.error}</span>}
                </div>
              </>
            )}
          </Field>
        </div>
      </div>

      <div class="contact-form-author contact-form-field">
        {/* <label for="subject">Subject *</label> */}
        <Field name="subject">
          {(field, props) => (
            <>
              <input
                {...props}
                value={field.value}
                disabled={theme.userInfoRemembered}
                type="text"
                id="subject"
                placeholder="Subject"
                class={field.error ? "error" : ""}
                size={30}
                maxLength={245}
                autoComplete="subject"
                required
              />
              <div class="contact-form-error-message">
                {field.error && <span>{field.error}</span>}
              </div>
            </>
          )}
        </Field>
      </div>

      <div class="contact-form-comment contact-form-field">
        {/* <label for="messageText">
          Your Message <span class="required">*</span>
        </label> */}
        <Field name="messageText">
          {(field, props) => (
            <>
              <textarea
                {...props}
                value={field.value}
                id="messageText"
                placeholder="Your message here..."
                class={field.error ? "error" : ""}
                cols={45}
                rows={8}
                maxLength={65525}
                required
              />
              <div class="contact-form-error-message">
                {field.error && <span>{field.error}</span>}
              </div>
            </>
          )}
        </Field>
      </div>

      <div class="form-submit">
        <input
          name="submit"
          type="submit"
          id="submit"
          class="submit"
          value="Submit Message"
        />
      </div>
    </Form>
  );
});
