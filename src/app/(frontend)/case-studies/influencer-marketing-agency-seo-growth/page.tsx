import { CmsPage, cmsMetadata } from "@/components/cms/CmsPage";
import { routes } from "@/lib/site";

// Content, SEO and structured data for this built-in route are managed in the CMS (Pages → caseInfluencer).
const PATH = routes.caseInfluencer;

export const generateMetadata = () => cmsMetadata(PATH);

export default function InfluencerCasePage() {
  return <CmsPage path={PATH} />;
}
