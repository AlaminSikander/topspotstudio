import { CmsPage, cmsMetadata } from "@/components/cms/CmsPage";
import { routes } from "@/lib/site";

// Content, SEO and structured data for this built-in route are managed in the CMS (Pages → caseStudies).
const PATH = routes.caseStudies;

export const generateMetadata = () => cmsMetadata(PATH);

export default function CaseStudiesHub() {
  return <CmsPage path={PATH} />;
}
