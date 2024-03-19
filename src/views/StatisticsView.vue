<template>
    <article class="container-fluid">
        <h1 class="text-nowrap">{{ pageTitle }}</h1>

        <template v-if="showNavLinks">
            <div class="list-group stats-nav">
                <div class="list-group-item">
                    <span class="d-inline-block" style="width: 2.5rem"><Icon :name="Vehicle.name" /></span>
                    <router-link class="btn btn-link" :to="{ name: 'stats-per-vehicle' }">{{ $t("vehicle") }}</router-link>
                </div>
                <div class="list-group-item">
                    <span class="d-inline-block" style="width: 2.5rem"><Icon :name="VehicleType.name" /></span>
                    <router-link class="btn btn-link" :to="{ name: 'stats-per-vehicleType' }">{{ $t("vehicleType") }}</router-link>
                </div>
                <div class="list-group-item">
                    <span class="d-inline-block" style="width: 2.5rem"><Icon :name="Vehicle.name" class="me-1" /><Icon :name="VehicleType.name" /></span>
                    <router-link class="btn btn-link" :to="{ name: 'stats-per-vehicle-per-type' }">{{ $t("vehicle") }} + {{ $t("vehicleType") }}</router-link>
                </div>
                <div class="list-group-item">
                    <span class="d-inline-block" style="width: 2.5rem"><Icon :name="InterventionType.name" /></span>
                    <router-link class="btn btn-link" :to="{ name: 'stats-per-interventionType' }">{{ $t("interventionType") }}</router-link>
                </div>
                <div class="list-group-item">
                    <span class="d-inline-block" style="width: 2.5rem"><Icon :name="InterventionType.name" class="me-1" /><Icon :name="VehicleType.name" /></span>
                    <router-link class="btn btn-link" :to="{ name: 'stats-per-interventionType-and-vehicleType' }">{{ $t("interventionType") }} + {{ $t("vehicleType") }}</router-link>
                </div>
                <div class="list-group-item">
                    <span class="d-inline-block" style="width: 2.5rem"><Icon :name="Supplier.name" /></span>
                    <router-link class="btn btn-link" :to="{ name: 'stats-per-supplier' }">{{ $t("supplier") }}</router-link>
                </div>
            </div>
        </template>

        <template v-if="statsApi">
            <RouterView v-slot="{ Component }">
                <component :is="Component" :api="statsApi" />
            </RouterView>
        </template>

        <div class="row">
            <div class="col-md order-2 order-md-1 mb-2">
                <RouterView name="filter" v-slot="{ Component: Filter }">
                    <component :is="Filter" :filter="filter" />
                </RouterView>
            </div>
            <div class="col-auto order-1 mb-2">
                <NavLinks />
            </div>
        </div>
        <RouterView name="results" v-slot="{ Component }">
            <component :is="Component" :api="statsApi" />
        </RouterView>
    </article>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import { Entity as Vehicle } from "@/entities/vehicles"
import { Entity as VehicleType } from "@/entities/vehicle-types"
import { Entity as Supplier } from "@/entities/intervention-operators"
import { Entity as InterventionType } from "@/entities/intervention-types"
import { useLang } from "@/regira_modules/vue"
import NavLinks from "@/statistics/components/NavLinks.vue"

const { translate, translateMessage } = useLang()
const filter = ref({ year: new Date().getFullYear() })

const router = useRouter()
const statsApi = computed(() => router.currentRoute.value.meta?.api)
const showNavLinks = computed(() => router.currentRoute.value.name === "statistics")
const pageTitle = computed(() => (router.currentRoute.value.meta?.title && translateMessage(router.currentRoute.value.meta?.title as string)) || translate("statistics"))
</script>

<style scoped>
a {
    text-decoration: none;
}
</style>
