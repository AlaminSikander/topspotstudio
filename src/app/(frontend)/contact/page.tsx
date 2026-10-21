import { CmsPage, cmsMetadata } from "@/components/cms/CmsPage";
import { routes } from "@/lib/site";

// Content, SEO and structured data for this built-in route are managed in the CMS (Pages → contact).
const PATH = routes.contact;

export const generateMetadata = () => cmsMetadata(PATH);

export default function ContactPage() {
  return <CmsPage path={PATH} />;
}
