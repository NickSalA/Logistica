import {
  createClient as baseCreateClient,
  type ClientConfig,
} from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";
import sm from "../prismic.config.json";
import { publicEnv } from "@/config/env";

/**
 * The project's Prismic repository name.
 */
export const repositoryName = publicEnv.prismicEnvironment || sm.repositoryName;

// Las rutas se versionan en prismic.config.json y deben coincidir con App Router.
const routes = sm.routes;

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: ClientConfig = {}) => {
  const client = baseCreateClient(repositoryName, {
    routes,
    fetchOptions: publicEnv.isProduction
      ? { next: { tags: ["prismic"] }, cache: "force-cache" }
      : { next: { revalidate: 5 } },
    ...config,
  });

  enableAutoPreviews({ client });

  return client;
};
