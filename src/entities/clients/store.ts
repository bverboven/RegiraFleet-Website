import { ref, computed } from "vue"
import { defineStore } from "pinia"
import { useAxios } from "@/regira_modules/vue/http"
import { useAuthStore } from "@/regira_modules/vue/auth"
import Entity from "./Entity"

export const useEntityStore = defineStore(Entity.name, () => {
    const authStore = useAuthStore()
    const { getClaimValue, refresh: refreshToken } = authStore
    const items = ref<Array<Entity>>()

    async function load(): Promise<void> {
        const axios = useAxios()
        items.value = await axios.get(`clients`).then((r) => r.data)
    }
    async function setActiveClient(id: string) {
        await refreshToken({ clientId: id })
    }
    const activeClient = computed(() => items.value?.find((x) => x.id == getClaimValue("client")))

    // load clients when authenticated (client-plugin should be registered before auth-plugin)
    authStore.$onAction(
        ({ name, after }) =>
            ["login", "refresh", "validateToken"].includes(name) &&
            after(() => {
                console.debug("authStore.$onAction", { name, authStore })
                if (authStore.isAuthenticated) {
                    load()
                }
            })
    )

    return {
        items,
        activeClient,

        load,
        setActiveClient,
    }
})

export default useEntityStore
