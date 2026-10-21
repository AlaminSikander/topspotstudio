import { CmsPage, cmsMetadata } from "@/components/cms/CmsPage";
import { routes } from "@/lib/site";

// Content, SEO and structured data for this built-in route are managed in the CMS (Pages → nzLocalSeo).
const PATH = routes.nzLocalSeo;

export const generateMetadata = () => cmsMetadata(PATH);

export default function LocalSeoPage() {
  return <CmsPage path={PATH} />;
}
