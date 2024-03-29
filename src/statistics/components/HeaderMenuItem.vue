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
            <Icon name="statistics" /> <span class="d-sm-none d-lg-inline">{{ $t("statistics") }}</span>
        </a>
        <ul class="dropdown-menu" :class="{ show: showNavbarStatisticsDropdown }" aria-labelledby="navbarStatistiekenDropdown">
            <li>
                <router-link class="dropdown-item" :to="{ name: 'stats-per-vehicle' }" @click="handleCloseMenu"><Icon :name="Vehicle.name" class="me-1" /> {{ $t("vehicle") }}</router-link>
            </li>
            <li>
                <router-link class="dropdown-item" :to="{ name: 'stats-per-vehicleType' }" @click="handleCloseMenu"><Icon :name="VehicleType.name" class="me-1" /> {{ $t("vehicleType") }}</router-link>
            </li>
            <li>
                <router-link class="dropdown-item" :to="{ name: 'stats-per-vehicle-per-type' }" @click="handleCloseMenu">
                    <Icon :name="Vehicle.name" class="me-1" /><Icon :name="VehicleType.name" class="me-1" /> {{ $t("vehicle") }} + {{ $t("vehicleType") }}
                </router-link>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
                <router-link class="dropdown-item" :to="{ name: 'stats-per-interventionType' }" @click="handleCloseMenu">
                    <Icon :name="InterventionType.name" class="me-1" /> {{ $t("interventionType") }}
                </router-link>
            </li>
            <li>
                <router-link class="dropdown-item" :to="{ name: 'stats-per-interventionType-and-vehicleType' }" @click="handleCloseMenu">
                    <Icon :name="InterventionType.name" class="me-1" /><Icon :name="VehicleType.name" class="me-1" /> {{ $t("interventionType") }} + {{ $t("vehicleType") }}
                </router-link>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
                <router-link class="dropdown-item" :to="{ name: 'stats-per-supplier' }" @click="handleCloseMenu"><Icon :name="Supplier.name" class="me-1" /> {{ $t("supplier") }}</router-link>
            </li>
        </ul>
    </li>
</template>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from "vue"
import { Entity as Vehicle } from "@/entities/vehicles"
import { Entity as VehicleType } from "@/entities/vehicle-types"
import { Entity as Supplier } from "@/entities/intervention-operators"
import { Entity as InterventionType } from "@/entities/intervention-types"

const showNavbarStatisticsDropdown = ref(false)
const globalProps = getCurrentInstance()?.appContext.config.globalProperties as any
const enabled = ref<boolean>()

document.addEventListener("click", () => {
    handleCloseMenu()
})
function handleCloseMenu() {
    showNavbarStatisticsDropdown.value = false
}

onMounted(() => {
    enabled.value = globalProps?.$statistics?.enabled
})
</script>
