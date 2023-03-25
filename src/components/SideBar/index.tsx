import { component$ } from "@builder.io/qwik";
import DestinationsWidget, {
  type DestinationsWidgetProps,
} from "./DestinationsWidget";
import NewsletterWidget, {
  type NewsletterWidgetProps,
} from "./NewsletterWidget";
import PopularPostsWidget, {
  type PopularPostsWidgetProps,
} from "./PopularPostsWidget";

export interface SideBarProps {
  popularPosts?: PopularPostsWidgetProps;
  destinations?: DestinationsWidgetProps;
  newsletter?: NewsletterWidgetProps;
}

export default component$<SideBarProps>((props) => {
  return (
    <div class="sidebar">
      {props.popularPosts && <PopularPostsWidget {...props.popularPosts} />}
      {props.destinations && <DestinationsWidget {...props.destinations} />}
      {props.newsletter && <NewsletterWidget {...props.newsletter} />}
    </div>
  );
});
