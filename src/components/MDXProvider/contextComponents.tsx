import TweetEmbed from "./TweetEmbed";
import InstagramEmbed from "./InstagramEmbed";
import TextContainer from "./components/TextContainer";
import type { TextContainerProps } from "./components/TextContainer";
import Anchor from "./components/Anchor";
import ImageAd from "./components/ImageAd";
import ActivityList from "./components/ActivityList";
import type { ActivityListProps } from "./components/ActivityList";
import AlignCenter from "./components/AlignCenter";
import Button from "./components/Button";
import ImageWithCaption from "./components/ImageWithCaption";
import type { ImageWithCaptionProps } from "./components/ImageWithCaption";
import ContainerWidget from "./components/ContainerWidget";
import SearchWidget from "./components/ContainerWidget/SearchWidget";
import type { SearchWidgetProps } from "./components/ContainerWidget/SearchWidget";
import WidgetSearchContainer from "./components/ContainerWidget/WidgetSearchContainer";
import Iframe from "./components/Iframe";
import type { IframeProps } from "./components/Iframe";
import AdPlacer from "./components/AdPlacer";
import type { AdPlacerProps } from "./components/AdPlacer";
import FacebookVideoEmbed from "./components/FacebookVideoEmbed";
import type { FacebookVideoEmbedProps } from "./components/FacebookVideoEmbed";
import LegendPhoto from "./components/LegendPhoto";
import Icon from "./components/Icon";
import type { IconProps } from "./components/Icon";
import TitleStay from "./components/TitleStay";
import WidgetLink from "./components/WidgetLink";
import type { WidgetLinkProps } from "./components/WidgetLink";
import HotelDisplay from "./components/HotelDisplay";
import MainPays from "./components/MainPays";
import type { MainPaysProps } from "./components/MainPays";
import BilletTarif from "./components/BilletTarif";
import ListCombineContainer from "./components/BilletTarif/ListCombineContainer";
import ListCombine from "./components/BilletTarif/ListCombine";
import ListBlockQuote from "./components/BilletTarif/ListBlockQuote";
import TopLabel from "./components/BilletTarif/TopLabel";
import type { TopLabelProps } from "./components/BilletTarif/TopLabel";
import GiftBlock from "./components/GiftBlock";
import DisplayGenerique from "./components/DisplayGenerique";
import DisplayGeneriqueBody from "./components/DisplayGenerique/DisplayGeneriqueBody";
import PartenaireTop from "./components/PartenaireTop";

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
  TextContainer: (props: TextContainerProps) => <TextContainer {...props} />,
  blockquote: (props: ElementProps) => (
    <div class="blockquote_wrapper">
      <blockquote {...props} />
    </div>
  ),
  ActivityList: (props: ActivityListProps) => <ActivityList {...props} />,
  Button: (props: ElementProps) => <Button {...props} />,
  AlignCenter: (props: ElementProps) => <AlignCenter {...props} />,
  ImageWithCaption: (props: ImageWithCaptionProps) => (
    <ImageWithCaption {...props} />
  ),
  ContainerWidget: (props: ElementProps) => <ContainerWidget {...props} />,
  WidgetSearchContainer: (props: ElementProps) => (
    <WidgetSearchContainer {...props} />
  ),
  SearchWidget: (props: SearchWidgetProps) => <SearchWidget {...props} />,
  Iframe: (props: IframeProps) => <Iframe {...props} />,
  AdPlacer: (props: AdPlacerProps) => <AdPlacer {...props} />,
  FacebookVideoEmbed: (props: FacebookVideoEmbedProps) => (
    <FacebookVideoEmbed {...props} />
  ),
  LegendPhoto: (props: ElementProps) => <LegendPhoto {...props} />,
  Icon: (props: IconProps) => <Icon {...props} />,
  TitleStay: (props: ElementProps) => <TitleStay {...props} />,
  WidgetLink: (props: WidgetLinkProps) => <WidgetLink {...props} />,
  HotelDisplay: (props: ElementProps) => <HotelDisplay {...props} />,
  MainPays: (props: MainPaysProps) => <MainPays {...props} />,
  BilletTarif: (props: ElementProps) => <BilletTarif {...props} />,
  ListCombineContainer: (props: ElementProps) => (
    <ListCombineContainer {...props} />
  ),
  ListCombine: (props: ElementProps) => <ListCombine {...props} />,
  ListBlockQuote: (props: ElementProps) => <ListBlockQuote {...props} />,
  TopLabel: (props: TopLabelProps) => <TopLabel {...props} />,
  GiftBlock: (props: ElementProps) => <GiftBlock {...props} />,
  DisplayGenerique: (props: ElementProps) => <DisplayGenerique {...props} />,
  DisplayGeneriqueBody: (props: ElementProps) => (
    <DisplayGeneriqueBody {...props} />
  ),
  PartenaireTop: (props: ElementProps) => <PartenaireTop {...props} />,
};
