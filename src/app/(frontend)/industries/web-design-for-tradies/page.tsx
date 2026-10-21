import { CmsPage, cmsMetadata } from "@/components/cms/CmsPage";
import { routes } from "@/lib/site";

// Content, SEO and structured data for this built-in route are managed in the CMS (Pages → webDesign).
const PATH = routes.webDesign;

export const generateMetadata = () => cmsMetadata(PATH);

export default function WebDesignPage() {
  return <CmsPage path={PATH} />;
}
