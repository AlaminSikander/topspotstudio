import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    include: ["tests/unit/**/*.test.ts"],
    environment: "node",
    // Unit tests must never pick up real credentials or databases from .env files.
    env: { DATABASE_URL: "", SMTP_HOST: "", SMTP_PASS: "", BLOB_READ_WRITE_TOKEN: "" },
  },
});
