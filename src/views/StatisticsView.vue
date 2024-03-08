<template>
    <article class="container-fluid">
        <h1 class="text-nowrap">{{ pageTitle }}</h1>

        <router-view name="filter"></router-view>
        <router-view></router-view>

        <div class="list-group mt-2" v-show="showList">
            <router-link class="list-group-item list-group-item-action" :to="{ name: 'stats-per-vehicleType' }">Totals per vehicletype per month</router-link>
            <router-link class="list-group-item list-group-item-action" :to="{ name: 'stats-per-vehicle' }">Totals per vehicle per month</router-link>
            <router-link class="list-group-item list-group-item-action" :to="{ name: 'stats-per-intervention' }">Totals per interventiontype</router-link>
            <router-link class="list-group-item list-group-item-action" :to="{ name: 'stats-per-supplier' }">Totals per supplier</router-link>
            <router-link class="list-group-item list-group-item-action" :to="{ name: 'stats-per-intervention-and-vehicleType' }"> Totals per interventiontype + vehicletype </router-link>
        </div>
    </article>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const showList = computed(() => true || router.currentRoute.value.name === "statistics")
const pageTitle = computed(() => (router.currentRoute.value.meta && router.currentRoute.value.meta.title) || "Statistics")
</script>
