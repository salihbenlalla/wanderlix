import { component$, useStyles$ } from "@builder.io/qwik";
import styles from "./style.css?inline";

export default component$(() => {
  useStyles$(styles);

  return (
    <form
      action=""
      method="post"
      id="commentform"
      class="comment-form"
      noValidate
    >
      <p class="comment-notes">
        Your email address will not be published. Required fields are marked *
      </p>
      <p class="comment-form-comment comment-form-field">
        <label for="comment">
          Comment <span class="required">*</span>
        </label>
        <textarea
          id="comment"
          name="comment"
          cols={45}
          rows={8}
          maxLength={65525}
          required
        ></textarea>
      </p>
      <p class="comment-form-author comment-form-field">
        <label for="author">Name *</label>
        <input
          id="author"
          name="author"
          type="text"
          value=""
          size={30}
          maxLength={245}
          autoComplete="name"
          required
        />
      </p>
      <p class="comment-form-email comment-form-field">
        <label for="email">Email *</label>
        <input
          id="email"
          name="email"
          type="email"
          value=""
          size={30}
          maxLength={100}
          aria-describedby="email-notes"
          autoComplete="email"
          required
        />
      </p>
      <p class="comment-form-website comment-form-field">
        <label for="url">Website</label>
        <input
          id="url"
          name="url"
          type="url"
          value=""
          size={30}
          maxLength={200}
          autoComplete="url"
        />
      </p>
      <p class="comment-form-cookies-consent">
        <input
          id="comment-cookies-consent"
          name="comment-cookies-consent"
          type="checkbox"
          value="yes"
        />
        <label for="comment-cookies-consent">
          Save my name, email, and website in this browser for the next time I
          comment.
        </label>
      </p>
      <p class="form-submit">
        <input
          name="submit"
          type="submit"
          id="submit"
          class="submit"
          value="Post Comment"
        />
        <input
          type="hidden"
          name="comment_post_ID"
          value="47"
          id="comment_post_ID"
        />
        <input
          type="hidden"
          name="comment_parent"
          id="comment_parent"
          value="0"
        />
      </p>
    </form>
  );
});
