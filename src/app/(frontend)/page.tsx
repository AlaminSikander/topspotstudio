import { CmsPage, cmsMetadata } from "@/components/cms/CmsPage";
import { routes } from "@/lib/site";

// Content, SEO and structured data for this built-in route are managed in the CMS (Pages → home).
const PATH = routes.home;

export const generateMetadata = () => cmsMetadata(PATH);

export default function HomePage() {
  return <CmsPage path={PATH} />;
}
