<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <router-link class="navbar-brand" :to="{ name: 'home' }" :title="'Fleet Manager v ' + version">Fleet Manager</router-link>
            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                @click.stop="showNavBarContent = !showNavBarContent"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item d-none">
                        <router-link class="nav-link" aria-current="page" :to="{ name: 'home' }" :title="'Fleet Manager v ' + version">Fleet Manager</router-link>
                    </li>
                    <!-- <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'brands' }">Brands</router-link>
                    </li> -->
                    <li class="nav-item" v-for="navItem in navbarItems">
                        <RouterLink :to="{ name: navItem.id + 'Overview', query: navItem.initialQuery || {} }" class="nav-link" @click.native="handleCloseMenu">
                            <icon :name="navItem.id" />
                            <span class="d-sm-none d-lg-inline ms-2">{{ navItem.overviewTitle }}</span>
                        </RouterLink>
                    </li>
                    <li class="nav-item dropdown">
                        <a
                            class="nav-link dropdown-toggle"
                            @click.stop.prevent="showNavbarStatisticsDropdown = !showNavbarStatisticsDropdown"
                            href="#"
                            id="navbarStatistiekenDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Statistieken
                        </a>
                        <ul class="dropdown-menu" :class="{ show: showNavbarStatisticsDropdown }" aria-labelledby="navbarStatistiekenDropdown">
                            <li>
                                <router-link class="dropdown-item" :to="{ name: 'stats-per-car' }">Totalen per wagen</router-link>
                            </li>
                            <li>
                                <router-link class="dropdown-item" :to="{ name: 'stats-per-carType' }">Totalen per wagentype</router-link>
                            </li>
                            <li>
                                <router-link class="dropdown-item" :to="{ name: 'stats-per-car-per-type' }">Totalen per wagen &amp; wagentype</router-link>
                            </li>
                            <li><hr class="dropdown-divider" /></li>
                            <li>
                                <router-link class="dropdown-item" :to="{ name: 'stats-per-intervention' }">Totalen per interventietype</router-link>
                            </li>
                            <li>
                                <router-link class="dropdown-item" :to="{ name: 'stats-per-intervention-and-carType' }"> Totalen per interventietype &amp; wagentype </router-link>
                            </li>
                            <li><hr class="dropdown-divider" /></li>
                            <li>
                                <router-link class="dropdown-item" :to="{ name: 'stats-per-supplier' }">Totalen per leverancier</router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
                <form class="d-flex" role="search">
                    <div class="row">
                        <div v-if="$auth.enabled" class="col-sm-auto">
                            <AccountMenu :isAuthenticated="$auth.isAuthenticated" @close="handleCloseMenu" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref, watchEffect, getCurrentInstance } from "vue"
import { useConfig } from "@/app-config"
import type { IConfig } from "@/regira_modules/vue/entities"
import AccountMenu from "@/components/user/HeaderMenu.vue"

const { version } = useConfig()

const showNavBarContent = ref(false)
const showNavbarManagementDropdown = ref(false)
const showNavbarStatisticsDropdown = ref(false)

document.addEventListener("click", () => {
    showNavBarContent.value = false
    showNavbarManagementDropdown.value = false
    showNavbarStatisticsDropdown.value = false
})

const app = getCurrentInstance()!
const configs = Object.entries(app.appContext.config.globalProperties.$configs).map(([_, config]: any) => config as IConfig)

const { navbar: navbarKeys } = useConfig()
const navbarItems = ref<Array<IConfig>>([])
const showNavbarContent = ref(false)

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
