// import react, { reactCompilerPreset } from '@vitejs/plugin-react'
// import babel from '@rolldown/plugin-babel'
// import { defineConfig } from 'vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     babel({ presets: [reactCompilerPreset()] })
//   ],
// })

import { defineConfig, transformWithOxc } from "vite";
import react from "@vitejs/plugin-react";

const jsxInJs = () => ({
  name: "jsx-in-js",
  enforce: "pre",

  async transform(code, id) {
    if (!id.split("?")[0].endsWith(".js") ||
        !id.includes("/src/")) {
      return null;
    }

    return await transformWithOxc(code, id, {
      lang: "jsx",
    });
  },
});

export default defineConfig({
  plugins: [
    jsxInJs(),
    react(),
  ],
});
