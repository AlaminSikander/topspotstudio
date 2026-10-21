import { CmsPage, cmsMetadata } from "@/components/cms/CmsPage";
import { routes } from "@/lib/site";

// Content, SEO and structured data for this built-in route are managed in the CMS (Pages → about).
const PATH = routes.about;

export const generateMetadata = () => cmsMetadata(PATH);

export default function AboutPage() {
  return <CmsPage path={PATH} />;
}
