import { CmsPage, cmsMetadata } from "@/components/cms/CmsPage";
import { routes } from "@/lib/site";

// Content, SEO and structured data for this built-in route are managed in the CMS (Pages → caseImageEditing).
const PATH = routes.caseImageEditing;

export const generateMetadata = () => cmsMetadata(PATH);

export default function ImageEditingCasePage() {
  return <CmsPage path={PATH} />;
}
