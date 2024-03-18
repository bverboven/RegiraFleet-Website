<template>
    <form class="row row-cols-lg-auto align-items-center">
        <div class="col"><input type="number" v-model="filter.year" class="form-control" /></div>
        <div class="col"><VehicleTypeSelector v-model="vehicleType" v-model:idValue="vehicleTypeId" /></div>
        <div class="col"><button type="button" class="btn btn-info">Submit</button></div>
    </form>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { storeToRefs } from "pinia"
import { type Entity as VehicleType, SelectorDropDown as VehicleTypeSelector } from "@/entities/vehicle-types"
import useStatisticsStore from "../store"

const { filter } = storeToRefs(useStatisticsStore())

const vehicleType = ref<VehicleType>()
const vehicleTypeId = ref<number>()
</script>
