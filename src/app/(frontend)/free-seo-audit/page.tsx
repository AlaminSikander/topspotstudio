import { CmsPage, cmsMetadata } from "@/components/cms/CmsPage";
import { routes } from "@/lib/site";

// Content, SEO and structured data for this built-in route are managed in the CMS (Pages → audit).
const PATH = routes.audit;

export const generateMetadata = () => cmsMetadata(PATH);

export default function FreeAuditPage() {
  return <CmsPage path={PATH} />;
}
