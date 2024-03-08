<template>
    <li v-if="enabled" class="nav-item dropdown">
        <a
            class="nav-link dropdown-toggle"
            @click.stop.prevent="showNavbarStatisticsDropdown = !showNavbarStatisticsDropdown"
            href="#"
            id="navbarStatistiekenDropdown"
            role="button"
            data-toggle="dropdown"
            aria-expanded="false"
        >
            <Icon name="statistics" /> Statistics
        </a>
        <ul class="dropdown-menu" :class="{ show: showNavbarStatisticsDropdown }" aria-labelledby="navbarStatistiekenDropdown">
            <li>
                <router-link class="dropdown-item" :to="{ name: 'stats-per-vehicle' }">Totals per vehicle</router-link>
            </li>
            <li>
                <router-link class="dropdown-item" :to="{ name: 'stats-per-vehicleType' }">Totals per vehicletype</router-link>
            </li>
            <li>
                <router-link class="dropdown-item" :to="{ name: 'stats-per-vehicle-per-type' }">Totals per vehicle + vehicletype</router-link>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
                <router-link class="dropdown-item" :to="{ name: 'stats-per-intervention' }">Totals per interventiontype</router-link>
            </li>
            <li>
                <router-link class="dropdown-item" :to="{ name: 'stats-per-intervention-and-vehicleType' }">Totals per interventiontype + vehicletype</router-link>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
                <router-link class="dropdown-item" :to="{ name: 'stats-per-supplier' }">Totals per supplier</router-link>
            </li>
        </ul>
    </li>
</template>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from "vue"

const showNavbarStatisticsDropdown = ref(false)
const globalProps = getCurrentInstance()?.appContext.config.globalProperties as any
const enabled = ref<boolean>()
onMounted(() => {
    enabled.value = globalProps?.$statistics?.enabled
})
</script>
