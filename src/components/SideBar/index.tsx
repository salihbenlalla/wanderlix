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
import PostsCarouselWidget, {
  type PostsCarouselWidgetProps,
} from "./PostsCarouselWidget";
import SponsoredAdWidget, {
  type SponsoredAdWidgetProps,
} from "./SponsoredAdWidget";
import TagCloudsWidget, { type TagCloudsWidgetProps } from "./TagCloudsWidget";

export interface SideBarProps {
  popularPosts?: PopularPostsWidgetProps;
  destinations?: DestinationsWidgetProps;
  newsletter?: NewsletterWidgetProps;
  postsCarousel?: PostsCarouselWidgetProps;
  tagClouds?: TagCloudsWidgetProps;
  sponsoredAd?: SponsoredAdWidgetProps;
}

export default component$<SideBarProps>((props) => {
  return (
    <div class="sidebar">
      {props.popularPosts && <PopularPostsWidget {...props.popularPosts} />}
      {props.destinations && <DestinationsWidget {...props.destinations} />}
      {props.newsletter && <NewsletterWidget {...props.newsletter} />}
      {props.postsCarousel && <PostsCarouselWidget {...props.postsCarousel} />}
      {props.tagClouds && <TagCloudsWidget {...props.tagClouds} />}
      {props.sponsoredAd && <SponsoredAdWidget {...props.sponsoredAd} />}
    </div>
  );
});
