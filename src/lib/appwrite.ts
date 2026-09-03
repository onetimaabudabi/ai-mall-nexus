import { Account, Client, ID, Permission, Query, Role, Storage, TablesDB } from "appwrite";

export const APPWRITE_ENDPOINT = "https://fra.cloud.appwrite.io/v1";
export const APPWRITE_PROJECT_ID = "6a969041000bfc99144f";
export const APPWRITE_PROJECT_NAME = "My first project";

export const DB_ID = "aimall";
export const BUCKET_ID = "product-images";

export const TABLES = {
  profiles: "profiles",
  products: "products",
  threads: "threads",
  messages: "messages",
  documents: "documents",
} as const;

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const tables = new TablesDB(client);
export const storage = new Storage(client);

export function fileUrl(fileId?: string | null) {
  if (!fileId) return null;
  return `${APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${APPWRITE_PROJECT_ID}`;
}

export { client, ID, Query, Permission, Role };
