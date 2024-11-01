import { component$, useStyles$ } from "@builder.io/qwik";
import styles from "./style.css?inline";

interface NextPrevPostProps {
  prevPostSlug: string;
  prevPostTitle: string;
  nextPostSlug: string;
  nextPostTitle: string;
}

export default component$<NextPrevPostProps>((props) => {
  useStyles$(styles);
  return (
    <div class="next-prev-post-container">
      <div class="nextprev-prevcontainer prev">
        <div class="next-prev-post prev">
          <div class="next-prev-text">Previous Post</div>
          <h6 class="next-prev-post-title">
            <a
              aria-label="previous post link"
              title="previous post"
              href={`/post/${props.prevPostSlug}`}
            >
              {props.prevPostTitle}
            </a>
          </h6>
        </div>
      </div>
      <div class="nextprev-prevcontainer next">
        <div class="next-prev-post next">
          <div class="next-prev-text">Next Post</div>
          <h6 class="next-prev-post-title">
            <a
              aria-label="previous post link"
              title="previous post"
              href={`/post/${props.nextPostSlug}`}
            >
              {props.nextPostTitle}
            </a>
          </h6>
        </div>
      </div>
    </div>
  );
});
