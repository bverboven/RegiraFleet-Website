import { type App } from "vue"
import { useEntityStore } from "./store"
import { storeToRefs } from "pinia"

export default {
    install(app: App<Element>) {
        const { activeTenant } = storeToRefs(useEntityStore())
        Object.defineProperty(app.config.globalProperties, "$activeTenant", {
            get: () => activeTenant.value,
            enumerable: true,
            configurable: true,
        })
    },
}
