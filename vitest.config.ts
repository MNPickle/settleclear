import { defineConfig } from "vitest/config";

export default defineConfig({
  // Avoid loading Next/Tailwind PostCSS while unit-testing pure TS libs.
  css: { postcss: { plugins: [] } },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
