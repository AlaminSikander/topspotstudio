import { CmsPage, cmsMetadata } from "@/components/cms/CmsPage";
import { routes } from "@/lib/site";

// Content, SEO and structured data for this built-in route are managed in the CMS (Pages → tradies).
const PATH = routes.tradies;

export const generateMetadata = () => cmsMetadata(PATH);

export default function TradiesPage() {
  return <CmsPage path={PATH} />;
}
