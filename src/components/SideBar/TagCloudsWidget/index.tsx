import { component$ } from "@builder.io/qwik";
import WidgetContainer from "../WidgetContainer";
// import styles from "./style.css?inline";
import { v4 as uuidv4 } from "uuid";
// import { Link } from "@builder.io/qwik-city";
import SingleTag from "./SingleTag";

export interface Tag {
  name: string;
  url: string;
}

export interface TagCloudsWidgetProps {
  title?: string;
  tags: Tag[];
}

export default component$<TagCloudsWidgetProps>((props) => {
  // useStyles$(styles);
  return (
    <WidgetContainer title={props.title}>
      {props.tags.length && (
        <div class="tag-cloud">
          {props.tags.map((tag) => (
            <SingleTag
              key={uuidv4()}
              url={`/tag/${tag.url}`}
              tagName={tag.name}
            />
            // <Link
            //   href={`/tag/${tag.url}`}
            //   class="tag-cloud__tag"
            // >
            //   #{tag.name}
            // </Link>
          ))}
        </div>
      )}
    </WidgetContainer>
  );
});
