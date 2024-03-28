import type { App } from "vue"
import type { RouteRecordRaw } from "vue-router"

import { plugin as countryPlugin } from "./countries"
import { plugin as clientPlugin } from "./clients"
import { plugin as brandPlugin } from "./brands"
import { plugin as interventionPlugin } from "./interventions"
import { plugin as interventionTypePlugin } from "./intervention-types"
import { plugin as interventionOperatorPlugin } from "./intervention-operators"
import { plugin as vehiclePlugin } from "./vehicles"
import { plugin as vehicleTypePlugin } from "./vehicle-types"

// order is important -> cf HomeView
export const plugins = [countryPlugin, brandPlugin, interventionPlugin, interventionTypePlugin, interventionOperatorPlugin, vehiclePlugin, vehicleTypePlugin]

export default {
    install(app: App<Element>, { routes }: { routes: Array<RouteRecordRaw> }) {
        app.config.globalProperties.$configs = {}

        plugins.forEach((plugin) => app.use(plugin, { routes }))
    },
}

export { countryPlugin, clientPlugin, brandPlugin, interventionPlugin, interventionTypePlugin, interventionOperatorPlugin, vehiclePlugin, vehicleTypePlugin }
