import { component$, useStyles$ } from "@builder.io/qwik";
import styles from "./style.css?inline";
// import PostCard from "./PostCard";
import PaginationButtons from "./PaginationButtons";
import PostCard, { type PostCardData } from "./PostCard";

type PostsGridProps = {
  posts: PostCardData[];
  totalPages: number;
  currentPage: number;
  format?: "grid" | "list";
};

export default component$<PostsGridProps>((props) => {
  useStyles$(styles);

  const isList = props.format === "list" ? true : false;

  return (
    <div>
      <div class={`posts-grid${isList ? " format-list" : ""}`}>
        {props.posts.map((el, index) => {
          return (
            <PostCard key={index} format={props.format ?? "grid"} {...el} />
          );
        })}
      </div>

      <PaginationButtons
        pageNumber={props.currentPage}
        totalPages={props.totalPages}
      />
    </div>
  );
});
