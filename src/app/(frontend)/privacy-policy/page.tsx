import { CmsPage, cmsMetadata } from "@/components/cms/CmsPage";
import { routes } from "@/lib/site";

// Content, SEO and structured data for this built-in route are managed in the CMS (Pages → privacy).
const PATH = routes.privacy;

export const generateMetadata = () => cmsMetadata(PATH);

export default function PrivacyPage() {
  return <CmsPage path={PATH} />;
}
