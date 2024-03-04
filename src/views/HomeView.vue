<template>
    <section>
        <h1 class="text-center">
            {{ homeTitle }}
        </h1>

        <Dashboard :items="dashboardItems" />
    </section>
</template>

<script setup lang="ts">
import { ref, watchEffect, getCurrentInstance } from "vue"
import { storeToRefs } from "pinia"
import appConfig from "@/app-config"
import { useAuthStore } from "@/regira_modules/vue/auth"
import { type DashboardItem, toDashboardItem, Dashboard, type IConfig } from "@/regira_modules/vue/entities"

const app = getCurrentInstance()!
const configs = Object.entries(app.appContext.config.globalProperties.$configs).map(([_, config]: [_: string, config: IConfig]) => config)

const { title: homeTitle, dashboard: dashboardKeys } = appConfig
const dashboardItems = ref<Array<DashboardItem>>([])

const { permissions } = storeToRefs(useAuthStore())
watchEffect(() => {
    dashboardItems.value = []
    dashboardKeys.forEach((key: string) => {
        const config = configs.find((d) => d.routePrefix == key)
        if (config == null) {
            console.warn(`Could not find dashboard item ${key}`)
        } else {
            const item = toDashboardItem(config)
            dashboardItems.value.push(item)
        }
    })
})
</script>
