<template>
    <nav class="navbar navbar-expand-md bg-body-tertiary" v-click-outside="handleCloseMenu">
        <router-link class="navbar-brand" :to="{ name: 'home' }" :title="'Fleet Manager v ' + version">
            <img :src="logo" style="height: 2rem; vertical-align: top" class="me-1" />
            Fleet Manager
        </router-link>
        <button class="navbar-toggler" type="button" @click.stop="showNavbarContent = !showNavbarContent">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse bg-light pt-2 pt-md-0" :class="{ show: showNavbarContent }">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item d-none">
                    <router-link class="nav-link" aria-current="page" :to="{ name: 'home' }" :title="'Fleet Manager v ' + version">Fleet Manager</router-link>
                </li>
                <!-- <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'brands' }">Brands</router-link>
                    </li> -->
                <li v-for="navItem in navbarItems" :key="navItem.id" class="nav-item">
                    <RouterLink :to="{ name: navItem.id + 'Overview', query: navItem.initialQuery || {} }" class="nav-link" @click="handleCloseMenu">
                        <icon :name="navItem.id" />
                        <span class="d-md-none d-lg-inline ms-2">{{ navItem.overviewTitle }}</span>
                    </RouterLink>
                </li>
                <StatisticsMenuItem />
            </ul>
            <form class="d-flex">
                <div class="row">
                    <div v-if="$auth.enabled" class="col">
                        <AccountMenu :isAuthenticated="$auth.isAuthenticated" @close="handleCloseMenu" />
                    </div>
                    <div class="col-auto">
                        <ul class="list-inline">
                            <li class="list-inline-item cursor pointer" :class="{ 'fw-bold': langCode == 'en' }" @click="setLangCode('en')">EN</li>
                            <li class="list-inline-item cursor pointer" :class="{ 'fw-bold': langCode == 'fr' }" @click="setLangCode('fr')">FR</li>
                            <li class="list-inline-item cursor pointer" :class="{ 'fw-bold': langCode == 'nl' }" @click="setLangCode('nl')">NL</li>
                        </ul>
                    </div>
                </div>
            </form>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref, watchEffect, getCurrentInstance } from "vue"
import { useConfig } from "@/app-config"
import logo from "@/assets/images/logo-sm.png"
import type { IConfig } from "@/regira_modules/vue/entities"
import AccountMenu from "@/components/user/HeaderMenu.vue"
import { HeaderMenuItem as StatisticsMenuItem } from "@/statistics"
import { useLang } from "@/regira_modules/vue/lang"

const { version } = useConfig()

const showNavbarContent = ref(false)
const showNavbarManagementDropdown = ref(false)
const showNavbarStatisticsDropdown = ref(false)

document.addEventListener("click", () => {
    showNavbarContent.value = false
    showNavbarManagementDropdown.value = false
    showNavbarStatisticsDropdown.value = false
})

const app = getCurrentInstance()!
const configs = Object.entries(app.appContext.config.globalProperties.$configs).map(([_, config]: any) => config as IConfig)

const { navbar: navbarKeys } = useConfig()
const navbarItems = ref<Array<IConfig>>([])

const { langCode, setLangCode } = useLang()

function handleCloseMenu() {
    showNavbarContent.value = false
}

watchEffect(() => {
    navbarItems.value = []
    navbarKeys.forEach((key: string) => {
        const config = configs.find((d) => d.routePrefix == key)
        if (config == null) {
            console.warn(`Could not find navbar item ${key}`)
        } else {
            navbarItems.value.push(config)
        }
    })
})
</script>
