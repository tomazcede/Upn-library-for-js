import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.js",
      name: "UPNQR",
      formats: ["es"],
      fileName: () => "upn-qr.es.js",
    },
    rollupOptions: {
      external: ["qrcode"],
    },
  },
});