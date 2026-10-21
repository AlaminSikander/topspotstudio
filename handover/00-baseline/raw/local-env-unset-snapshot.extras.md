# Site-wide snapshot for http://localhost:3101

Captured: 2026-10-21T14:00:14.051Z

## /robots.txt

Status: 200

```
User-Agent: *
Disallow: /
```

## /sitemap.xml

Status: 200

```
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>
```

## Response headers for /

```
cache-control: s-maxage=31536000
connection: keep-alive
content-encoding: gzip
content-type: text/html; charset=utf-8
date: Wed, 21 Oct 2026 14:00:14 GMT
etag: "sg9kj2vqa9627r"
keep-alive: timeout=5
permissions-policy: camera=(), microphone=(), geolocation=()
referrer-policy: strict-origin-when-cross-origin
transfer-encoding: chunked
vary: rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch, Accept-Encoding
x-content-type-options: nosniff
x-frame-options: SAMEORIGIN
x-nextjs-cache: HIT
x-nextjs-prerender: 1, 1
x-nextjs-stale-time: 300
x-robots-tag: noindex, nofollow
```

## 404 behaviour

/this-page-does-not-exist-tss/ → 404; x-robots-tag: noindex, nofollow

## Trailing slash

/about → 308 /about/

