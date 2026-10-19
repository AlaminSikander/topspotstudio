// Generates logo, icon and favicon files from the supplied brand artwork.
// Run: node scripts/generate-brand-assets.mjs
import sharp from "sharp";
import { writeFile, mkdir } from "node:fs/promises";

const NAVY = "#0F2742";

// Polygons traced from the supplied mark (60-degree geometry), viewBox 0 0 270 208.
export const MARK_T = "0,0 83,0 98.7,27 72,27 161.5,182 147,207 42,27 15.7,27";
export const MARK_S =
  "105,0 269,0 253.3,27 151.3,27 161.8,45 242.8,45 187.2,140.4 159.5,93 184.3,93 198.3,69 145.7,69";

const markSvg = (fill, { size, padding = 0, background } = {}) => {
  const w = 270;
  const h = 208;
  const side = Math.max(w, h) + padding * 2;
  const ox = (side - w) / 2;
  const oy = (side - h) / 2 + 6;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${side} ${side}"${
    size ? ` width="${size}" height="${size}"` : ""
  }>${background ? `<rect width="${side}" height="${side}" rx="${side * 0.18}" fill="${background}"/>` : ""}<g transform="translate(${ox} ${oy})" fill="${fill}"><polygon points="${MARK_T}"/><polygon points="${MARK_S}"/></g></svg>`;
};

function encodeIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  const entries = [];
  let offset = 6 + 16 * pngs.length;
  for (const { size, buf } of pngs) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(buf.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += buf.length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.buf)]);
}

await mkdir("public/brand", { recursive: true });

await writeFile("public/brand/tss-mark.svg", markSvg(NAVY, { padding: 0 }));

// Trimmed full logo (transparent) for schema/OG use, plus a white-text variant for dark surfaces.
const trimmed = await sharp("assets/brand/top-spot-studio-logo-original.png").trim().toBuffer();
await sharp(trimmed).resize({ width: 800 }).png({ compressionLevel: 9 }).toFile("public/brand/top-spot-studio-logo.png");

// App icons generated from the vector mark.
const iconSvg = Buffer.from(markSvg(NAVY, { padding: 34 }));
await sharp(iconSvg).resize(512, 512).png().toFile("src/app/icon.png");
await sharp(Buffer.from(markSvg(NAVY, { padding: 60, background: "#FFFFFF" })))
  .resize(180, 180)
  .flatten({ background: "#FFFFFF" })
  .png()
  .toFile("src/app/apple-icon.png");

const icoSizes = [16, 32, 48];
const icoPngs = await Promise.all(
  icoSizes.map(async (size) => ({
    size,
    buf: await sharp(Buffer.from(markSvg(NAVY, { padding: 18 }))).resize(size, size).png().toBuffer(),
  })),
);
await writeFile("src/app/favicon.ico", encodeIco(icoPngs));

console.log("Brand assets generated.");
