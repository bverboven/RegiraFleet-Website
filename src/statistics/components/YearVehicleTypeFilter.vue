<template>
    <form class="row row-cols-lg-auto align-items-center" @submit.prevent="$emit('fetch-data')">
        <div class="col"><input type="number" v-model="filter.year" class="form-control" @change="handleChange" /></div>
        <div class="col"><VehicleTypeSelector v-model="vehicleType" v-model:idValue="filter.vehicleTypeId" @change="handleChange" /></div>
        <div class="col-auto">
            <button type="submit" class="btn btn-primary p-1">Submit</button>
        </div>
        <div class="col-auto">
            <button type="button" class="btn btn-success py-1" @click="$emit('fetch-doc', 'xlsx')"><Icon name="xlsx" /></button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { type Entity as VehicleType, SelectorDropDown as VehicleTypeSelector } from "@/entities/vehicle-types"
import type { IFilter } from "../filter"

const emit = defineEmits<{
    (e: "fetch-data"): void
    (e: "fetch-doc", type: string): void
}>()

const filter = defineModel<IFilter>({ default: () => ({ year: new Date().getFullYear(), vehicleTypeId: 0 }) })
function handleChange() {
    filter.value = { ...filter.value }
    emit("fetch-data")
}

const vehicleType = ref<VehicleType>()
</script>
