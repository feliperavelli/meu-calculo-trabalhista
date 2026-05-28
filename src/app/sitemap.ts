import type { MetadataRoute } from "next";

const siteUrl = Processo.env.NEXT_PUBLIC_SITE_URL ?? "https://www.meucalculo.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
