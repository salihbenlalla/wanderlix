import TweetEmbed from "./TweetEmbed";
import InstagramEmbed from "./InstagramEmbed";
import TextContainer from "./components/TextContainer";
import Anchor from "./components/Anchor";
import ImageAd from "./components/ImageAd";
import ActivityList from "./components/ActivityList";
import type { ActivityListProps } from "./components/ActivityList";
import AffButton from "./components/AffButton";
import AlignCenter from "./components/AlignCenter";
import ButtonSection from "./components/ButtonSection";
import ImageWithCaption from "./components/ImageWithCaption";
import type { ImageWithCaptionProps } from "./components/ImageWithCaption";
import ContainerWidget from "./components/ContainerWidget";
import SearchWidget from "./components/ContainerWidget/SearchWidget";
import type { SearchWidgetProps } from "./components/ContainerWidget/SearchWidget";
import WidgetSearchContainer from "./components/ContainerWidget/WidgetSearchContainer";
import Iframe from "./components/Iframe";
import AdPlacer from "./components/AdPlacer";
import type { AdPlacerProps } from "./components/AdPlacer";
import FacebookVideoEmbed from "./components/FacebookVideoEmbed";
import type { FacebookVideoEmbedProps } from "./components/FacebookVideoEmbed";
import LegendPhoto from "./components/LegendPhoto";
import Icon from "./components/Icon";
import type { IconProps } from "./components/Icon";

type ElementProps = {
  [key: string]: any;
};

export const contextComponents = {
  a: (props: ElementProps) => <Anchor {...props} />,
  ImageAd: (props: ElementProps) => <ImageAd {...props} />,
  TweetEmbed: (props: ElementProps) => <TweetEmbed tweetId={props.tweetId} />,
  InstagramEmbed: (props: ElementProps) => (
    <InstagramEmbed postId={props.postId} />
  ),
  TextContainer: (props: ElementProps) => (
    <TextContainer title={props.title} {...props} />
  ),
  blockquote: (props: ElementProps) => (
    <div class="blockquote_wrapper">
      <blockquote {...props} />
    </div>
  ),
  ActivityList: (props: ActivityListProps) => <ActivityList {...props} />,
  AffButton: (props: ElementProps) => <AffButton {...props} />,
  ButtonSection: (props: ElementProps) => <ButtonSection {...props} />,
  AlignCenter: (props: ElementProps) => <AlignCenter {...props} />,
  ImageWithCaption: (props: ImageWithCaptionProps) => (
    <ImageWithCaption {...props} />
  ),
  ContainerWidget: (props: ElementProps) => <ContainerWidget {...props} />,
  WidgetSearchContainer: (props: ElementProps) => (
    <WidgetSearchContainer {...props} />
  ),
  SearchWidget: (props: SearchWidgetProps) => <SearchWidget {...props} />,
  Iframe: (props: ElementProps) => <Iframe {...props} />,
  AdPlacer: (props: AdPlacerProps) => <AdPlacer {...props} />,
  FacebookVideoEmbed: (props: FacebookVideoEmbedProps) => (
    <FacebookVideoEmbed {...props} />
  ),
  LegendPhoto: (props: ElementProps) => <LegendPhoto {...props} />,
  Icon: (props: IconProps) => <Icon {...props} />,
};
