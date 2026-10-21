/**
 *   npm run cms:seed                 create anything that is missing; never touches existing records
 *   npm run cms:seed -- --overwrite  also replace existing pages/globals with the seed content (local/staging only)
 */
import config from "@payload-config";
import { getPayload } from "payload";
import { seed } from "./index";

const payload = await getPayload({ config });
await seed(payload, { overwrite: process.argv.includes("--overwrite") });
