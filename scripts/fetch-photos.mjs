// Downloads the licensed photos listed in docs/ASSET_REGISTER.md and stores optimised masters.
// Run: node scripts/fetch-photos.mjs   (requires network access)
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";

const OUT = "src/assets/photos";

const photos = [
  {
    file: "roofer-working-on-roof.jpg",
    url: "https://images.pexels.com/photos/37623622/pexels-photo-37623622.jpeg?auto=compress&cs=tinysrgb&w=2000",
  },
  {
    file: "roof-tiles-installation.jpg",
    url: "https://images.unsplash.com/photo-1745478433406-2bd51772770e?w=2000&q=85&fm=jpg",
  },
  {
    file: "electrician-switchboard.jpg",
    url: "https://images.pexels.com/photos/27928762/pexels-photo-27928762.jpeg?auto=compress&cs=tinysrgb&w=2000",
  },
  {
    file: "plumber-fitting-pipe.jpg",
    url: "https://images.pexels.com/photos/29226620/pexels-photo-29226620.jpeg?auto=compress&cs=tinysrgb&w=2000",
  },
  {
    file: "builders-timber-frame.jpg",
    url: "https://images.pexels.com/photos/8829878/pexels-photo-8829878.jpeg?auto=compress&cs=tinysrgb&w=2000",
  },
  {
    file: "landscaper-trimming-lawn.jpg",
    url: "https://images.pexels.com/photos/20534859/pexels-photo-20534859.jpeg?auto=compress&cs=tinysrgb&w=2000",
  },
  {
    file: "customer-searching-on-phone.jpg",
    url: "https://images.pexels.com/photos/36712997/pexels-photo-36712997.jpeg?auto=compress&cs=tinysrgb&w=2000",
  },
];

await mkdir(OUT, { recursive: true });

for (const p of photos) {
  const res = await fetch(p.url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`${p.file}: HTTP ${res.status}`);
  const input = Buffer.from(await res.arrayBuffer());
  const out = await sharp(input)
    .rotate()
    .resize({ width: 1800, height: 1800, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .withMetadata({ exif: {} })
    .toBuffer();
  await writeFile(`${OUT}/${p.file}`, out);
  const meta = await sharp(out).metadata();
  console.log(`${p.file} ${meta.width}x${meta.height} ${(out.length / 1024).toFixed(0)}KB`);
}
