import {
  $,
  type QRL,
  component$,
  useContext,
  useStyles$,
  useTask$,
  useVisibleTask$,
  type Signal,
  useSignal,
} from "@builder.io/qwik";
import styles from "./style.css?inline";
import { getCookie, setCookie } from "~/lib/helpers/cookies";
import { v4 as uuidv4 } from "uuid";
import { ThemeContext } from "~/routes/layout";
import {
  email,
  type Input,
  minLength,
  object,
  string,
  boolean,
  number,
  nullish,
  custom,
} from "valibot";
import {
  useForm,
  valiForm$,
  getValue,
  setValue,
  focus,
  reset,
  type SubmitHandler,
} from "@modular-forms/qwik";
import { type Comment } from "../commentHandlers";
import Tooltip from "~/components/Tooltip";

const CommentSchema = object({
  email: string([
    minLength(1, "Please enter your email."),
    email("The email address is badly formatted."),
  ]),
  authorName: string([minLength(1, "Please enter your name.")]),
  commentText: string([minLength(1, "Please enter your comment text.")]),
  website: string([
    minLength(1, "Please enter a website."),
    custom((input) => {
      const urlPattern =
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\w .-]*)*\/?$/;
      return urlPattern.test(input);
    }, "Please enter a valid URL or domain name."),
  ]),
  comment_cookies_consent: boolean(),
  commenter_id: nullish(string([])),
  commentId: nullish(number()),
  postSlug: nullish(string()),
});

export type CommentFormInput = Input<typeof CommentSchema>;

interface EditCommentAction {
  action: "edit";
  postSlug: string;
  commentsSignal: Signal<Comment[]>;
  commentId: number | null;
  commentText: string;
  authorName: string;
  email: string;
  website: string;
}

interface AddCommentAction {
  action: "add";
  postSlug: string;
  commentsSignal: Signal<Comment[]>;
}

type CommentFormProps = EditCommentAction | AddCommentAction;

export default component$<CommentFormProps>((props) => {
  useStyles$(styles);

  const theme = useContext(ThemeContext);

  const commentFormLoader = useSignal<CommentFormInput>({
    email: "",
    authorName: "",
    commentText: "",
    website: "",
    comment_cookies_consent: false,
    commenter_id: "",
    commentId: null,
    postSlug: props.postSlug,
  });

  const [commentForm, { Form, Field }] = useForm<CommentFormInput>({
    loader: commentFormLoader,
    fieldArrays: [],
    validate: valiForm$(CommentSchema),
  });

  useTask$(({ track }) => {
    track(() => commentForm);
    theme.commentForm = commentForm;
  });

  const autoFillUserInfo = $(() => {
    if (getCookie("comment_author_name")) {
      setValue(
        commentForm,
        "authorName",
        getCookie("comment_author_name") ?? ""
      );
    }

    if (getCookie("comment_author_email")) {
      setValue(commentForm, "email", getCookie("comment_author_email") ?? "");
    }

    if (getCookie("comment_author_website")) {
      setValue(
        commentForm,
        "website",
        getCookie("comment_author_website") ?? ""
      );
    }

    if (getCookie("commenter_id")) {
      // get the commenter id from cookies
      setValue(commentForm, "commenter_id", getCookie("commenter_id"));
    } else {
      //to set the commenter id in case it does not exist
      setValue(commentForm, "commenter_id", uuidv4());
    }
  });

  const resetForm = $(() => {
    reset(commentForm, { initialValue: true });
    autoFillUserInfo();
  });

  const checkIfUserInfoRemembered = $(() => {
    return (
      !!getCookie("comment_author_email") &&
      !!getCookie("comment_author_name") &&
      !!getCookie("comment_author_website")
    );
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async ({ track }) => {
    track(() => getValue(commentForm, "comment_cookies_consent"));
    if (props.action === "edit") {
      focus(commentForm, "commentText");
    }

    theme.userInfoRemembered = await checkIfUserInfoRemembered();

    autoFillUserInfo();
  });

  useTask$(() => {
    if (props.action === "edit") {
      setValue(commentForm, "commentText", props.commentText);
      setValue(commentForm, "authorName", props.authorName);
      setValue(commentForm, "email", props.email);
      setValue(commentForm, "website", props.website);
      setValue(commentForm, "commentId", props.commentId);
      // setValue(commentForm, "postSlug", props.formLoader.value.postSlug);
    }
  });

  const rememberUserId = $(() => {
    const commenterId = getValue(commentForm, "commenter_id");

    if (getCookie("commenter_id") || !commenterId) {
      return;
    }

    setCookie("commenter_id", commenterId, {
      expires: 365,
      path: "/",
    });
  });

  const rememberUserInfo = $(() => {
    const authorName = getValue(commentForm, "authorName");
    const email = getValue(commentForm, "email");
    const website = getValue(commentForm, "website");

    if (!authorName || !email || !website) {
      return;
    }

    setCookie("comment_author_name", authorName, { expires: 365, path: "/" });
    setCookie("comment_author_email", email, { expires: 365, path: "/" });
    setCookie("comment_author_website", website, { expires: 365, path: "/" });
  });

  const handleSubmit: QRL<SubmitHandler<CommentFormInput>> = $(
    async (values, _ /*event*/) => {
      try {
        const response = await fetch("/comments", {
          method: props.action === "edit" ? "PUT" : "POST",
          body: JSON.stringify(values),
        });
        const responseData = await response.json();

        if (response.status === 200) {
          rememberUserId();

          const cookieConsentChecked = getValue(
            commentForm,
            "comment_cookies_consent"
          );

          if (cookieConsentChecked) {
            rememberUserInfo();
          }

          resetForm();
          if (props.action === "edit") {
            theme.toast.isVisible = true;
            theme.toast.type = "success";
            theme.toast.message = "comment updated seccessfuly.";

            theme.editModalOpen = false;

            props.commentsSignal.value = props.commentsSignal.value.map(
              (comment) =>
                comment.id === responseData.comment.id
                  ? responseData.comment
                  : comment
            );
          } else {
            theme.toast.isVisible = true;
            theme.toast.type = "success";
            theme.toast.message = "comment posted seccessfuly.";

            props.commentsSignal.value = [
              ...props.commentsSignal.value,
              responseData.comment,
            ];
            theme.commentsCount = theme.commentsCount + 1;
          }
        } else {
          theme.toast.isVisible = true;
          theme.toast.type = "error";
          theme.toast.message = "something went wrong.";
        }
      } catch (error) {
        theme.toast.isVisible = true;
        theme.toast.type = "error";
        theme.toast.message = "something went wrong.";
      }
    }
  );

  return (
    <Form onSubmit$={handleSubmit} id="commentform" class="comment-form">
      <p class="comment-notes">
        Your email address will not be published. Required fields are marked *
      </p>
      <div class="comment-form-comment comment-form-field">
        <label for="commentText">
          Comment <span class="required">*</span>
        </label>
        <Field name="commentText">
          {(field, props) => (
            <>
              <textarea
                {...props}
                value={field.value}
                id="commentText"
                class={field.error ? "error" : ""}
                cols={45}
                rows={8}
                maxLength={65525}
                required
              />
              <div class="comment-form-error-message">
                {field.error && <span>{field.error}</span>}
              </div>
            </>
          )}
        </Field>
      </div>
      <div class="comment-form-author comment-form-field">
        <label for="authorName">Name *</label>
        <Tooltip>
          <Field name="authorName">
            {(field, props) => (
              <>
                <input
                  {...props}
                  value={field.value}
                  disabled={theme.userInfoRemembered}
                  type="text"
                  id="authorName"
                  class={field.error ? "error" : ""}
                  size={30}
                  maxLength={245}
                  autoComplete="name"
                  required
                />
                <div class="comment-form-error-message">
                  {field.error && <span>{field.error}</span>}
                </div>
              </>
            )}
          </Field>
        </Tooltip>
      </div>
      <div class="comment-form-email comment-form-field">
        <label for="comment-form-email">Email *</label>
        <Tooltip>
          <Field name="email">
            {(field, props) => (
              <>
                <input
                  {...props}
                  value={field.value}
                  disabled={theme.userInfoRemembered}
                  type="email"
                  id="comment-form-email"
                  class={field.error ? "error" : ""}
                  aria-describedby="email-notes"
                  size={30}
                  maxLength={100}
                  autoComplete="email"
                  required
                />
                <div class="comment-form-error-message">
                  {field.error && <span>{field.error}</span>}
                </div>
              </>
            )}
          </Field>
        </Tooltip>
      </div>
      <div class="comment-form-website comment-form-field">
        <label for="website">Website</label>
        <Tooltip>
          <Field name="website">
            {(field, props) => (
              <>
                <input
                  {...props}
                  value={field.value}
                  disabled={theme.userInfoRemembered}
                  type="url"
                  id="website"
                  class={field.error ? "error" : ""}
                  size={30}
                  maxLength={200}
                  autoComplete="url"
                />
                <div class="comment-form-error-message">
                  {field.error && <span>{field.error}</span>}
                </div>
              </>
            )}
          </Field>
        </Tooltip>
      </div>
      <div class="comment-form-cookies-consent">
        <Tooltip isCheckbox={true}>
          <Field name="comment_cookies_consent" type="boolean">
            {(field, props) => (
              <>
                <input
                  {...props}
                  checked={field.value || theme.userInfoRemembered}
                  type="checkbox"
                  id="comment_cookies_consent"
                  class={field.error ? "error" : ""}
                  disabled={theme.userInfoRemembered}
                />
                <div class="comment-form-error-message">
                  {field.error && <span>{field.error}</span>}
                </div>
              </>
            )}
          </Field>
        </Tooltip>

        <label for="comment_cookies_consent">
          Save my name, email, and website in this browser for the next time I
          comment.
        </label>
      </div>

      <div class="form-submit">
        <input
          name="submit"
          type="submit"
          id="submit"
          class="submit"
          value="Post Comment"
        />

        <Field name="commenter_id">
          {(field, props) => (
            <>
              <input
                {...props}
                type="hidden"
                value={field.value}
                id="commenter_id"
              />
            </>
          )}
        </Field>

        <Field name="commentId" type="number">
          {(field, props) => (
            <>
              <input {...props} type="hidden" value={field.value} />
            </>
          )}
        </Field>

        <Field name="postSlug">
          {(field, props) => (
            <>
              <input {...props} type="hidden" value={field.value} />
            </>
          )}
        </Field>
      </div>
    </Form>
  );
});
