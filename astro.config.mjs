import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  server: {
    host: true,
  },

  adapter: cloudflare(),
});