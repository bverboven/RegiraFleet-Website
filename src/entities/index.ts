import type { App } from "vue"
import type { RouteRecordRaw } from "vue-router"

import { plugin as countryPlugin } from "./countries"
import { plugin as brandPlugin } from "./brands"
import { plugin as interventionTypePlugin } from "./intervention-type"
import { plugin as interventionOperatorPlugin } from "./intervention-operator"

// order is important -> cf HomeView
export const plugins = [countryPlugin, brandPlugin, interventionTypePlugin, interventionOperatorPlugin]

export default {
    install(app: App<Element>, { routes }: { routes: Array<RouteRecordRaw> }) {
        app.config.globalProperties.$configs = {}

        plugins.forEach((plugin) => app.use(plugin, { routes }))
    },
}
