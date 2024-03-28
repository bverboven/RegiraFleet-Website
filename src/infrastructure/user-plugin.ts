import { type App, watch } from "vue"
import { useAuthStore } from "@/regira_modules/vue/auth"
import { useLang } from "@/regira_modules/vue/lang"
import Permissions from "@/infrastructure/permissions"

export const plugin = {
    install(app: App) {
        const authStore = useAuthStore()
        Object.defineProperty(app.config.globalProperties, "$isReadonlyUser", {
            get: () => authStore.authData.hasPermission(Permissions.CAN_READ) && !authStore.authData.hasPermission(Permissions.CAN_WRITE),
            enumerable: true,
            configurable: true,
        })

        // make langCode persistent
        const { langCode, setLangCode } = useLang()
        const lastLangCode = localStorage.getItem("lang")
        if (!authStore.isAuthenticated && lastLangCode && lastLangCode != langCode.value) {
            setLangCode(lastLangCode.substring(0, 2))
        }
        watch(langCode, (newLangCode) => {
            localStorage.setItem("lang", newLangCode)
        })

        // make client persistent when logged off
        authStore.$onAction(
            ({ name, after }) =>
                ["login", "refresh"].includes(name) &&
                after(() => {
                    if (authStore.isAuthenticated) {
                        // client
                        const clientId = authStore.getClaimValue("client") as string
                        if (clientId) {
                            localStorage.setItem("client", clientId)
                        } else {
                            localStorage.removeItem("client")
                        }
                    }
                })
        )
    },
}

export default plugin
