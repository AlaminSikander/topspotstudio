import type { StaticImageData } from "next/image";
import buildersImg from "@/assets/photos/builders-timber-frame.jpg";
import customerImg from "@/assets/photos/customer-searching-on-phone.jpg";
import electricianImg from "@/assets/photos/electrician-switchboard.jpg";
import landscaperImg from "@/assets/photos/landscaper-trimming-lawn.jpg";
import plumberImg from "@/assets/photos/plumber-fitting-pipe.jpg";
import roofTilesImg from "@/assets/photos/roof-tiles-installation.jpg";
import rooferImg from "@/assets/photos/roofer-working-on-roof.jpg";
import { InfluencerComparison } from "@/components/sections/ProofSection";
import {
  AuditChecklistVisual,
  HeroPathCard,
  LocalSignalsDiagram,
  RemoteDeliveryVisual,
  RoleSplitDiagram,
  RoofingPageMap,
  SearchJourney,
  SeoScopeDiagram,
  SiteWireframe,
  TradeJobMatrix,
} from "@/components/visuals/Diagrams";
import type { SiteImageKey, VisualKey } from "@/cms/lib/options";


export const SITE_IMAGE_MAP: Record<SiteImageKey, StaticImageData> = {
  "roofer-working-on-roof": rooferImg,
  "electrician-switchboard": electricianImg,
  "roof-tiles-installation": roofTilesImg,
  "landscaper-trimming-lawn": landscaperImg,
  "builders-timber-frame": buildersImg,
  "plumber-fitting-pipe": plumberImg,
  "customer-searching-on-phone": customerImg,
};

const VISUAL_MAP: Record<VisualKey, () => React.JSX.Element> = {
  SearchJourney,
  HeroPathCard,
  SeoScopeDiagram,
  LocalSignalsDiagram,
  TradeJobMatrix,
  RoofingPageMap,
  SiteWireframe,
  AuditChecklistVisual,
  RoleSplitDiagram,
  RemoteDeliveryVisual,
  InfluencerComparison,
};

export function Visual({ name }: { name?: string | null }) {
  const Component = name ? VISUAL_MAP[name as VisualKey] : undefined;
  return Component ? <Component /> : null;
}
