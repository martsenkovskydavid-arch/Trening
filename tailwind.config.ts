import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: {
    colors: { ink: "#10131b", panel: "#191e29", muted: "#8992a5", accent: "#b7f36b" },
    boxShadow: { glow: "0 0 35px rgba(183,243,107,.12)" }
  }},
  plugins: []
};
export default config;