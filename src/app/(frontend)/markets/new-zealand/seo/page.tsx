import { CmsPage, cmsMetadata } from "@/components/cms/CmsPage";
import { routes } from "@/lib/site";

// Content, SEO and structured data for this built-in route are managed in the CMS (Pages → nzSeo).
const PATH = routes.nzSeo;

export const generateMetadata = () => cmsMetadata(PATH);

export default function NzSeoPage() {
  return <CmsPage path={PATH} />;
}
