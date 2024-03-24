import type { App } from "vue"
import { useAuthStore } from "@/regira_modules/vue/auth"
import Permissions from "@/infrastructure/permissions"

export const plugin = {
    install(app: App) {
        const authStore = useAuthStore()
        Object.defineProperty(app.config.globalProperties, "$isReadonlyUser", {
            get: () => authStore.authData.hasPermission(Permissions.CAN_READ) && !authStore.authData.hasPermission(Permissions.CAN_WRITE),
            enumerable: true,
            configurable: true,
        })
    },
}

export default plugin
