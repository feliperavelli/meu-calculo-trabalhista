import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Meu Cálculo Trabalhista",
    short_name: "Cálculo Trabalhista",
    description: "Calculadora de rescisão trabalhista online.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f9f9",
    theme_color: "#0f4a44",
  };
}
