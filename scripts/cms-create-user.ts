/**
 * Creates (or resets the password of) a CMS user without exposing credentials in code, git or logs.
 *
 *   CMS_USER_EMAIL=… CMS_USER_NAME=… CMS_USER_ROLE=admin|editor CMS_USER_PASSWORD=… npm run cms:create-admin
 *   add "-- --reset-password" to set a new password for an existing account (also unlocks it)
 *
 * Use a password manager to generate the password and pass it only through the environment of this one command.
 */
import config from "@payload-config";
import { getPayload } from "payload";
import { MIN_PASSWORD_LENGTH } from "../src/cms/collections/Users";

const email = process.env.CMS_USER_EMAIL?.trim().toLowerCase();
const name = process.env.CMS_USER_NAME?.trim();
const role = process.env.CMS_USER_ROLE === "editor" ? "editor" : "admin";
const password = process.env.CMS_USER_PASSWORD;
const reset = process.argv.includes("--reset-password");

if (!email || !password || (!name && !reset)) {
  console.error("Set CMS_USER_EMAIL, CMS_USER_NAME and CMS_USER_PASSWORD (and optionally CMS_USER_ROLE=editor).");
  process.exit(1);
}
if (password.length < MIN_PASSWORD_LENGTH) {
  console.error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
  process.exit(1);
}

const payload = await getPayload({ config });
const existing = await payload.find({ collection: "users", where: { email: { equals: email } }, limit: 1, overrideAccess: true });

if (existing.docs[0]) {
  if (!reset) {
    console.error(`A user with that email already exists. Re-run with "-- --reset-password" to set a new password.`);
    process.exit(1);
  }
  await payload.update({
    collection: "users",
    id: existing.docs[0].id,
    data: { password, loginAttempts: 0, lockUntil: null, active: true } as never,
    overrideAccess: true,
    context: { skipAudit: true },
  });
  console.log(`Password reset and account unlocked for ${email}.`);
} else {
  await payload.create({ collection: "users", data: { email, name: name!, role, password, active: true, canPublish: true }, overrideAccess: true });
  console.log(`Created ${role} account for ${email}.`);
}
process.exit(0);
