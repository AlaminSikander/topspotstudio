import { CmsPage, cmsMetadata } from "@/components/cms/CmsPage";
import { routes } from "@/lib/site";

// Content, SEO and structured data for this built-in route are managed in the CMS (Pages → roofing).
const PATH = routes.roofing;

export const generateMetadata = () => cmsMetadata(PATH);

export default function RoofingPage() {
  return <CmsPage path={PATH} />;
}
