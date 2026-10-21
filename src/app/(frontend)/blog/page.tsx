import { CmsPage, cmsMetadata } from "@/components/cms/CmsPage";
import { routes } from "@/lib/site";

// Content, SEO and structured data for this built-in route are managed in the CMS (Pages → blog).
const PATH = routes.blog;

export const generateMetadata = () => cmsMetadata(PATH);

export default function BlogHub() {
  return <CmsPage path={PATH} />;
}
