import { type App } from "vue"
import { useEntityStore } from "./store"
import { storeToRefs } from "pinia"

export default {
    install(app: App<Element>) {
        const { activeClient } = storeToRefs(useEntityStore())
        Object.defineProperty(app.config.globalProperties, "$activeClient", {
            get: () => activeClient.value,
            enumerable: true,
            configurable: true,
        })
    },
}
