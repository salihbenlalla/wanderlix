import { component$, useStyles$ } from "@builder.io/qwik";
import WidgetContainer from "../WidgetContainer";
import styles from "./style.css?inline";
import { v4 as uuidv4 } from "uuid";

export interface Tag {
  name: string;
  url: string;
}

export interface TagCloudsWidgetProps {
  title?: string;
  tags: Tag[];
}

export default component$<TagCloudsWidgetProps>((props) => {
  useStyles$(styles);
  return (
    <WidgetContainer title={props.title}>
      {props.tags.length && (
        <div class="tag-cloud">
          {props.tags.map((tag) => (
            <a key={uuidv4()} href={tag.url} class="tag-cloud__tag">
              #{tag.name}
            </a>
          ))}
        </div>
      )}
    </WidgetContainer>
  );
});
