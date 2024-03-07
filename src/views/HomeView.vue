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
import appConfig from "@/app-config"
import { type IDashboardItem, toDashboardItem, Dashboard, type IConfig } from "@/regira_modules/vue/entities"

const app = getCurrentInstance()!
const configs = Object.entries(app.appContext.config.globalProperties.$configs).map(([_, config]) => config as IConfig)

const { title: homeTitle, dashboard: dashboardKeys } = appConfig
const dashboardItems = ref<Array<IDashboardItem>>([])

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
    const statisticsItem: IDashboardItem = {
        name: "statistics",
        title: "Statistics",
        icon: "statistics",
        description: "Export statistics to Excel",
    }
    dashboardItems.value.push(statisticsItem)
})
</script>
