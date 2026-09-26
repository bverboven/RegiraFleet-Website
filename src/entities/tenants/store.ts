import { ref, computed } from "vue"
import { defineStore } from "pinia"
import { useAxios } from "regira_modules/vue/http"
import { onAuthenticated, useAuthStore } from "regira_modules/vue/auth"
import Entity from "./Entity"

export const useEntityStore = defineStore(Entity.name, () => {
    const authStore = useAuthStore()
    const { getClaimValue, refresh: refreshToken } = authStore
    const items = ref<Array<Entity>>()

    async function load(): Promise<void> {
        const axios = useAxios()
        items.value = await axios.get(`tenants`).then((r) => r.data)
    }
    async function setActiveTenant(id: string) {
        await refreshToken({ tenantId: id })
    }
    const activeTenant = computed(() => items.value?.find((x) => x.id == getClaimValue("tenant")))

    // load tenants once a token is present: sign-in, refresh (tenant switch), or a stored token restored on reload;
    // re-validating the same token does not reload them
    onAuthenticated(() => load())

    return {
        items,
        activeTenant,

        load,
        setActiveTenant,
    }
})

export default useEntityStore
