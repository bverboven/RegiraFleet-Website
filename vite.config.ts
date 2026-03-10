import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vueJsx()],
    build: {
        target: "esnext",
    },
    resolve: {
        alias: {
            "@/regira_modules": fileURLToPath(new URL("./node_modules/regira_modules/dist", import.meta.url)),
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
        preserveSymlinks: true,
    },
    define: {
        __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
    esbuild: {
        //drop: ["console", "debugger"],
    },
    base: "/manager/"
})
