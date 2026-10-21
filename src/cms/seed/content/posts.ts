import { cta, md } from "../helpers";

/** Demo articles for local/staging QA of the blog hub and article layout. Seeded only with `--demo-posts`; marked noindex. */
export const demoPosts = [
  {
    title: "What a Technical SEO Audit Actually Checks",
    slug: "what-a-technical-seo-audit-checks",
    excerpt: "A plain-English walkthrough of what we look at when we audit a service business website, and which issues usually matter most.",
    category: "seo",
    author: "asif",
    publishedAt: "2026-10-01T00:00:00.000Z",
    seo: {
      metaTitle: "What a Technical SEO Audit Actually Checks | Top Spot Studio",
      metaDescription: "A plain-English guide to technical SEO audits for service businesses: crawling, indexing, speed, structure and the fixes that usually come first.",
      ogEyebrow: "SEO",
      ogHeadline: "What a Technical SEO Audit Actually Checks",
      robotsIndex: "noindex",
    },
    cta: {
      title: "Want to know what your site needs first?",
      body: "We can review your website and give you a prioritised list of technical fixes.",
      button: cta("Get My Free SEO Audit", "/free-seo-audit/"),
    },
    content: md(`A technical SEO audit answers one question: can search engines find, understand and trust the pages that bring you enquiries? Everything else is detail.

## Can Google crawl and index the right pages?

We start by checking which pages Google can reach and which ones it has chosen to index. Common problems include:

- Important service pages blocked by robots.txt or a stray noindex tag
- Old or duplicate pages competing with the page you actually want to rank
- Sitemaps that list redirected or missing URLs

## Is the site structured around your services?

Each core service and location should have a clear, dedicated page with a descriptive title and one main heading. When several services share a single page, it is harder for that page to rank for any of them. Our [SEO services](/markets/new-zealand/seo/) usually start here.

## Does the site load quickly on a phone?

Most local searches happen on mobile. We check Core Web Vitals, oversized images and heavy scripts, because a slow page loses visitors before they ever see your phone number.

## What gets fixed first

1. Anything stopping key pages from being indexed
2. Duplicate or thin pages that split your rankings
3. Speed and mobile issues on your highest-value pages

**The goal is not a perfect score.** It is removing the issues that stop the right customers from finding you.`),
  },
  {
    title: "How to Set Up Your Google Business Profile Properly",
    slug: "google-business-profile-setup-guide",
    excerpt: "Your Google Business Profile is often the first thing local customers see. Here is how to set it up so it works for you.",
    category: "local-seo",
    author: "asif",
    publishedAt: "2026-10-08T00:00:00.000Z",
    seo: {
      metaTitle: "How to Set Up Your Google Business Profile Properly | Top Spot Studio",
      metaDescription: "A step-by-step guide to setting up and maintaining a Google Business Profile that helps local customers find and contact your business.",
      ogEyebrow: "Local SEO",
      ogHeadline: "How to Set Up Your Google Business Profile Properly",
      robotsIndex: "noindex",
    },
    cta: {
      title: "Not sure your profile is set up right?",
      body: "We can review your Google Business Profile alongside your website and show you what to improve.",
      button: cta("Get My Free SEO Audit", "/free-seo-audit/"),
    },
    content: md(`For many service businesses, the Google Business Profile drives more calls than the website itself. It is free, but it only works well when it is complete and accurate.

## Choose the right primary category

Your primary category has more influence on which searches you appear for than almost anything else on the profile. Pick the one that best describes your main service, then add secondary categories for the rest.

## Keep your details consistent

Your business name, address and phone number should match exactly across your profile, your website and any directories you are listed in. Inconsistent details make it harder for Google to trust which information is correct.

## Fill in every section

- Services, with a short description of each
- Service areas, if you travel to customers
- Opening hours, including public holidays
- Real photos of your work, team and vehicles

## Ask for reviews as part of your process

Steady, genuine reviews help both rankings and conversions. The easiest way to get them is to ask at the end of every completed job and make the link easy to find.

### Link the profile to the right page

Point your profile's website link to the page that best matches your main service and area, not always the homepage. Our [Local SEO support](/markets/new-zealand/local-seo/) covers this in more detail.`),
  },
  {
    title: "Five Website Fixes That Help Tradies Get More Enquiries",
    slug: "website-fixes-for-tradies",
    excerpt: "Small changes to a trade business website can make it much easier for a visitor to become a phone call. Start with these five.",
    category: "tradie-growth",
    author: "alamin",
    publishedAt: "2026-10-15T00:00:00.000Z",
    seo: {
      metaTitle: "Five Website Fixes That Help Tradies Get More Enquiries | Top Spot Studio",
      metaDescription: "Five practical website improvements for trade businesses that make it easier for visitors to call, book or request a quote.",
      ogEyebrow: "Tradie Growth",
      ogHeadline: "Five Website Fixes That Help Tradies Get More Enquiries",
      robotsIndex: "noindex",
    },
    cta: {
      title: "Want a second opinion on your website?",
      body: "We can look at your site from a customer's point of view and show you what is getting in the way of enquiries.",
      button: cta("Get My Free SEO Audit", "/free-seo-audit/"),
    },
    content: md(`Ranking well only helps if the visitor actually gets in touch. These five fixes are usually quick, and they focus on turning visits into enquiries.

## 1. Put your phone number where thumbs can reach it

On mobile, a tap-to-call button that stays visible as people scroll is often the single most effective change you can make.

## 2. Say what you do and where in the first screen

A visitor should know within a few seconds that you offer the service they need in their area. A clear headline such as "Roof repairs across Auckland" works better than a generic welcome message.

## 3. Show real work

Photos of completed jobs, your team and your vehicles build trust far more than stock images do.

## 4. Keep the quote form short

Ask only for what you need to call the customer back: name, phone, suburb and a short description. Every extra field loses some people.

## 5. Make every service easy to find

Give each main service its own page, linked clearly from the menu. It helps visitors and gives each service a better chance to rank. See how we approach this in [web design for tradies](/industries/web-design-for-tradies/).

**Start with the fix that affects the most visitors**, which is usually the mobile call button, and work down the list.`),
  },
];
