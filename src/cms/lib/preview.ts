/** Preview links stay on the same origin as the admin so the CMS session cookie authorises them. */
export const previewUrl = (path: string) => `/preview/?path=${encodeURIComponent(path)}`;
