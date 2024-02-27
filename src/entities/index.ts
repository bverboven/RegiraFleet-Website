import type { App } from "vue"
import type { RouteRecordRaw } from "vue-router"

import { plugin as countryPlugin } from "./countries"

// order is important -> cf HomeView
export const plugins = [
    countryPlugin
]

export default {
    install(app: App<Element>, { routes }: { routes: Array<RouteRecordRaw> }) {
        app.config.globalProperties.$configs = {}

        plugins.forEach((plugin) => app.use(plugin, { routes }))
    },
}
