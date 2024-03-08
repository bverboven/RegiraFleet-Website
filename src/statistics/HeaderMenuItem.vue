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
                <router-link class="dropdown-item" :to="{ name: 'stats-per-vehicle' }"><Icon :name="Vehicle.name" class="me-1" /> vehicle</router-link>
            </li>
            <li>
                <router-link class="dropdown-item" :to="{ name: 'stats-per-vehicleType' }"><Icon :name="VehicleType.name" class="me-1" /> vehicletype</router-link>
            </li>
            <li>
                <router-link class="dropdown-item" :to="{ name: 'stats-per-vehicle-per-type' }"><Icon :name="Vehicle.name" class="me-1" /><Icon :name="VehicleType.name" class="me-1" /> vehicle + vehicletype</router-link>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
                <router-link class="dropdown-item" :to="{ name: 'stats-per-interventionType' }"><Icon :name="InterventionType.name" class="me-1" /> interventiontype</router-link>
            </li>
            <li>
                <router-link class="dropdown-item" :to="{ name: 'stats-per-interventionType-and-vehicleType' }"><Icon :name="InterventionType.name" class="me-1" /><Icon :name="VehicleType.name" class="me-1" /> interventiontype + vehicletype</router-link>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
                <router-link class="dropdown-item" :to="{ name: 'stats-per-supplier' }"><Icon :name="Supplier.name" class="me-1" /> supplier</router-link>
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
onMounted(() => {
    enabled.value = globalProps?.$statistics?.enabled
})
</script>
