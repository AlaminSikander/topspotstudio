import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { HeroShell } from "@/components/sections/HeroBackdrop";
import { Callout } from "@/components/sections/Blocks";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, graph, webPageSchema, type Crumb } from "@/lib/schema";
import { CONTACT_EMAIL, GTM_ID, PRIVACY_APPROVED, routes } from "@/lib/site";

const meta = {
  title: "Privacy Policy | Top Spot Studio",
  description: "How Top Spot Studio collects, uses and protects information submitted through this website.",
  path: routes.privacy,
};

export const metadata: Metadata = pageMetadata({ ...meta, noindex: !PRIVACY_APPROVED });

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Privacy Policy", path: routes.privacy },
];

const LAST_UPDATED = "19 October 2026";

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={graph(webPageSchema({ path: meta.path, name: meta.title, description: meta.description }), breadcrumbSchema(crumbs))} />
      <HeroShell innerClassName="pb-14 pt-8 md:pb-16 md:pt-10">
          <Breadcrumbs items={crumbs} />
          <div className="mx-auto mt-10 max-w-[760px]">
            <p className="rise-in badge">
              <span aria-hidden className="badge-dot" />
              Legal
            </p>
            <h1 className="rise-in mt-6 [--d:80ms]">Privacy Policy</h1>
            <p className="rise-in mt-4 text-muted [--d:140ms]">Last updated: {LAST_UPDATED}</p>
            {!PRIVACY_APPROVED ? (
              <Callout className="mt-6" tone="neutral">
                <p>This policy is being finalised and may be updated before the website is formally launched.</p>
              </Callout>
            ) : null}
          </div>
      </HeroShell>

      <section className="bg-offwhite pb-20 pt-12 md:pb-28 md:pt-16">
        <div className="container-site">
          <div className="prose-tss mx-auto rounded-[28px] border border-line bg-white p-7 text-lg shadow-[var(--shadow-card)] sm:p-12 [&_h2]:text-[1.6rem] md:[&_h2]:text-[1.85rem]">
            <p>
              This policy explains how Top Spot Studio (“we”, “us”) handles personal information collected through this
              website. Top Spot Studio is a founder-led SEO and web growth studio based in Bangladesh, working remotely
              with businesses in New Zealand and other international markets.
            </p>

            <h2>Information we collect</h2>
            <p>We only collect the information you choose to give us, plus limited technical data needed to run the website.</p>
            <ul>
              <li>
                <strong>Free SEO Audit form:</strong> your name, work email, website address, business type, primary
                service, location or service area, main goal and any extra notes you add.
              </li>
              <li>
                <strong>Contact form:</strong> your name, business name, work email, phone number (optional), website
                address, location or service area, the services you are interested in, your message and how you heard
                about us.
              </li>
              <li>
                <strong>Technical data:</strong> our hosting provider records standard server logs (such as IP address,
                browser type and pages requested) to keep the website secure and working.
              </li>
              {GTM_ID ? (
                <li>
                  <strong>Analytics:</strong> we use Google Tag Manager and Google Analytics to understand how visitors use
                  the site, such as which pages are viewed and whether a form was submitted. We do not send your name,
                  email, phone number or message content to Google Analytics.
                </li>
              ) : null}
            </ul>
            <p>We do not ask for passwords, account logins or access to your Google Analytics, Search Console or website through these forms.</p>

            <h2>How we use your information</h2>
            <ul>
              <li>To review your website and send you the free audit you requested.</li>
              <li>To reply to your enquiry and discuss whether we can help.</li>
              <li>To keep reasonable records of our conversations with prospective and current clients.</li>
              <li>To protect the website against spam and misuse.</li>
            </ul>
            <p>We will not add you to a marketing list without your permission, and we do not sell your personal information.</p>

            <h2>Who we share it with</h2>
            <p>We use a small number of service providers to run this website and deliver form submissions:</p>
            <ul>
              <li>
                <strong>Vercel</strong> hosts the website.
              </li>
              <li>
                <strong>Resend</strong> delivers form submissions to our business inbox by email.
              </li>
              {GTM_ID ? (
                <li>
                  <strong>Google</strong> provides Tag Manager and Analytics.
                </li>
              ) : null}
            </ul>
            <p>
              These providers may store or process information outside Bangladesh and New Zealand, including in the
              United States. We only share what is needed for them to provide their service.
            </p>

            <h2>How long we keep it</h2>
            <p>
              We keep enquiry and audit emails for as long as we need them to respond, provide any services you ask for and
              maintain reasonable business records. You can ask us to delete your information at any time.
            </p>

            <h2>Your choices and rights</h2>
            <p>
              You can ask to access the personal information we hold about you, ask us to correct it, or ask us to delete
              it. If you are in New Zealand, you also have rights under the Privacy Act 2020, including the right to
              complain to the Office of the Privacy Commissioner.
            </p>
            {GTM_ID ? (
              <p>
                You can limit analytics cookies through your browser settings or by using Google’s analytics opt-out
                browser add-on.
              </p>
            ) : null}

            <h2>Security</h2>
            <p>
              The website uses HTTPS, and form submissions are sent over encrypted connections. No method of transmission or
              storage is completely secure, but we take reasonable steps to protect the information you share with us.
            </p>

            <h2>Contact us about privacy</h2>
            <p>
              To make a privacy request or ask a question about this policy,{" "}
              {CONTACT_EMAIL ? (
                <>
                  email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or use our{" "}
                </>
              ) : (
                <>use our </>
              )}
              <Link href={routes.contact}>contact form</Link>.
            </p>

            <h2>Changes to this policy</h2>
            <p>We may update this policy as our website or services change. The date at the top shows when it was last updated.</p>
          </div>
        </div>
      </section>
    </>
  );
}
