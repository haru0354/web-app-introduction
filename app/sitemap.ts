import { MetadataRoute } from "next";
import { getAllAppIntroductions } from "./lib/appIntroductionService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = process.env.WEBSITE_URL;
  const _lastModified = new Date();

  const allAppIntroductions = (await getAllAppIntroductions()) ?? [];

  const staticPaths = [
    {
      url: `${baseURL}`,
      lastModified: _lastModified,
    },
    {
      url: `${baseURL}/app`,
      lastModified: _lastModified,
    },
    {
      url: `${baseURL}/sitemaps`,
      lastModified: _lastModified,
    },
    {
      url: `${baseURL}/privacypolicy`,
      lastModified: _lastModified,
    },
  ];

  const dynamicPathsAllAppIntroductions = allAppIntroductions.map(
    (appIntroduction) => {
      return {
        url: `${baseURL}/${appIntroduction.id}`,
        lastModified: new Date(
          appIntroduction.createdAt || appIntroduction.updatedAt
        ),
      };
    }
  );

  return [...staticPaths, ...dynamicPathsAllAppIntroductions];
}
