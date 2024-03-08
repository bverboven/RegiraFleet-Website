import { type App } from "vue"
import type { RouteRecordRaw } from "vue-router"
import statisticsRoutes from "./routes"

export const plugin = {
    install(app: App, { routes }: { routes: Array<RouteRecordRaw> }) {
        routes.push(...statisticsRoutes)

        app.config.globalProperties.$statistics = { enabled: true }
    },
}

export default plugin
