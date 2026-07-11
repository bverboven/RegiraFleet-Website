<template>
    <div class="row border-bottom border-bottom-1 py-2">
        <div class="col-auto">
            <!-- <FormModalButton v-model="item" class="p-1" /> -->
            <router-link :to="{ name: config.key + 'Details', params: { id: item.$id } }" class="btn btn-link p-1">
                <Icon :name="config.key" />
            </router-link>
        </div>
        <div class="col-2 col-lg-1 text-nowrap">
            <div>
                {{ item.code }}
            </div>
        </div>
        <div class="col text-truncate">
            <div v-if="item.vehicleType != null">
                <VehicleTypeButton :modelValue="item.vehicleType!" :readonly="readonly" class="p-1" />
                {{ getVehicleType(item.vehicleType)?.title }}
            </div>
        </div>
        <div class="col d-none d-md-block text-truncate">
            <div v-if="item.brand != null">
                <BrandButton :modelValue="item.brand!" :readonly="readonly" class="p-1" />
                {{ getBrand(item.brand)?.title }}
            </div>
        </div>
        <div class="col d-none d-lg-block text-truncate">
            <div>{{ item.model }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { SaveResult } from "regira_modules/vue/entities"
import Entity from "../data/Entity"
import config from "../config/config"
import { FormModalButton as BrandButton, useEntityStore as useBrandStore } from "../../brands"
import { FormModalButton as VehicleTypeButton, useEntityStore as useVehicleTypeStore } from "../../vehicle-types"

const emit = defineEmits<{
    (e: "update:modelValue", args: Entity): void
    (e: "save", args: SaveResult<Entity>): void
    (e: "remove", args: Entity): void
    (e: "request-load", args: Entity): void
    (e: "request-save", args: Entity): void
    (e: "request-remove", args: Entity): void
}>()
const props = defineProps<{
    readonly?: boolean
}>()

const item = defineModel<Entity>({ required: true })
const { fromPool: getBrand } = useBrandStore()
const { fromPool: getVehicleType } = useVehicleTypeStore()
</script>
