<template>
    <article class="container-fluid">
        <h1 class="text-nowrap">{{ pageTitle }}</h1>

        <template v-if="showNavLinks">
            <div class="list-group stats-nav">
                <div class="list-group-item">
                    <span class="d-inline-block" style="width: 2.5rem"><Icon :name="Vehicle.name" /></span>
                    <router-link class="btn btn-link" :to="{ name: 'stats-per-vehicle' }">vehicle</router-link>
                </div>
                <div class="list-group-item">
                    <span class="d-inline-block" style="width: 2.5rem"><Icon :name="VehicleType.name" /></span>
                    <router-link class="btn btn-link" :to="{ name: 'stats-per-vehicleType' }">vehicletype</router-link>
                </div>
                <div class="list-group-item">
                    <span class="d-inline-block" style="width: 2.5rem"><Icon :name="Vehicle.name" class="me-1" /><Icon :name="VehicleType.name" /></span>
                    <router-link class="btn btn-link" :to="{ name: 'stats-per-vehicle-per-type' }">vehicle + vehicletype</router-link>
                </div>
                <div class="list-group-item">
                    <span class="d-inline-block" style="width: 2.5rem"><Icon :name="InterventionType.name" /></span>
                    <router-link class="btn btn-link" :to="{ name: 'stats-per-interventionType' }">interventiontype</router-link>
                </div>
                <div class="list-group-item">
                    <span class="d-inline-block" style="width: 2.5rem"><Icon :name="InterventionType.name" class="me-1" /><Icon :name="VehicleType.name" /></span>
                    <router-link class="btn btn-link" :to="{ name: 'stats-per-interventionType-and-vehicleType' }">interventiontype + vehicletype</router-link>
                </div>
                <div class="list-group-item">
                    <span class="d-inline-block" style="width: 2.5rem"><Icon :name="Supplier.name" /></span>
                    <router-link class="btn btn-link" :to="{ name: 'stats-per-supplier' }">supplier</router-link>
                </div>
            </div>
        </template>

        <template v-if="statsApi">
            <RouterView v-slot="{ Component }">
                <component :is="Component" :api="statsApi" />
            </RouterView>
        </template>
    </article>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useRouter } from "vue-router"
import { Entity as Vehicle } from "@/entities/vehicles"
import { Entity as VehicleType } from "@/entities/vehicle-types"
import { Entity as Supplier } from "@/entities/intervention-operators"
import { Entity as InterventionType } from "@/entities/intervention-types"

const router = useRouter()
const showNavLinks = computed(() => router.currentRoute.value.name === "statistics")
const pageTitle = computed(() => router.currentRoute.value.meta?.title || "Statistics")
const statsApi = computed(() => router.currentRoute.value.meta?.api)
</script>

<style scoped>
a {
    text-decoration: none;
}
</style>
