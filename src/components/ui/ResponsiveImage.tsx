import Image, { type StaticImageData } from "next/image";

type Ratio = "4/3" | "3/2" | "16/10" | "1/1" | "4/5" | "3/4";

const ratioClass: Record<Ratio, string> = {
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "16/10": "aspect-[16/10]",
  "1/1": "aspect-square",
  "4/5": "aspect-[4/5]",
  "3/4": "aspect-[3/4]",
};

export function ResponsiveImage({
  src,
  alt,
  ratio = "4/3",
  priority = false,
  sizes = "(min-width: 1024px) 560px, 100vw",
  className = "",
  position = "center",
  frame = false,
  reveal = false,
  rounded = "rounded-[20px]",
  caption,
}: {
  /** Static imports get a blur placeholder; media-library URLs load without one. */
  src: StaticImageData | string;
  alt: string;
  ratio?: Ratio;
  priority?: boolean;
  sizes?: string;
  className?: string;
  position?: string;
  /** Layered decorative frame for hero and feature imagery. */
  frame?: boolean;
  /** Clip-reveal the image as it scrolls into view. */
  reveal?: boolean;
  rounded?: string;
  caption?: string;
}) {
  return (
    <figure className={`group relative ${className}`}>
      {frame ? (
        <>
          <span
            aria-hidden
            className="absolute -bottom-5 -right-5 hidden h-[70%] w-[70%] rounded-[28px] border-2 border-teal/30 sm:block"
          />
          <span
            aria-hidden
            className="bg-dots absolute -left-6 -top-6 hidden h-32 w-40 rounded-[20px] opacity-70 sm:block"
          />
        </>
      ) : null}
      <div
        className={`relative overflow-hidden bg-teal-soft ${rounded} ${ratioClass[ratio]} ${reveal ? "reveal-clip" : ""} ${
          priority ? "img-settle" : ""
        } ${frame ? "shadow-[var(--shadow-lift)] ring-1 ring-navy/5" : ""}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          placeholder={typeof src === "string" ? "empty" : "blur"}
          className="img-zoom object-cover"
          style={{ objectPosition: position }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/25 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-30"
        />
      </div>
      {caption ? <figcaption className="mt-3 text-sm text-muted">{caption}</figcaption> : null}
    </figure>
  );
}
