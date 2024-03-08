<template>
    <form>
        <input type="number" v-model="year" class="form-control" />
        <VehicleTypeSelector v-model="vehicleType" v-model:idValue="vehicleTypeId" />
    </form>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { type Entity as VehicleType, SelectorDropDown as VehicleTypeSelector } from "@/entities/vehicle-types"
const year = ref<number>(new Date().getFullYear())
const vehicleType = ref<VehicleType>()
const vehicleTypeId = ref<number>()
</script>
