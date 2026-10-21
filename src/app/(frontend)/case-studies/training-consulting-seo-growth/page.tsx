import { CmsPage, cmsMetadata } from "@/components/cms/CmsPage";
import { routes } from "@/lib/site";

// Content, SEO and structured data for this built-in route are managed in the CMS (Pages → caseConsulting).
const PATH = routes.caseConsulting;

export const generateMetadata = () => cmsMetadata(PATH);

export default function ConsultingCasePage() {
  return <CmsPage path={PATH} />;
}
