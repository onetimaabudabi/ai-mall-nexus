import { Client } from "appwrite";

export const APPWRITE_ENDPOINT = "https://fra.cloud.appwrite.io/v1";
export const APPWRITE_PROJECT_ID = "6a969041000bfc99144f";
export const APPWRITE_PROJECT_NAME = "My first project";

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

export { client };
