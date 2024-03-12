<template>
    <div class="row border-bottom border-bottom-1 py-2">
        <div class="col-auto">
            <router-link :to="{ name: Entity.name + 'Details', params: { id: item.$id } }" class="btn btn-link p-1">
                <Icon :name="Entity.name" />
            </router-link>
        </div>
        <div class="col-2 col-md-1">
            <div class="italic-muted" :title="formatDate(item.interventionDate, $culture)">{{ formatShortDate(item.interventionDate, $culture) }}</div>
        </div>
        <div class="col d-none d-lg-block text-truncate">
            <VehicleButton :modelValue="item.vehicle" class="p-1" />
            {{ getVehicle(item.vehicle)?.$title }} <span class="text-muted">({{ getVehicle(item.vehicle)?.brand?.title }})</span>
        </div>
        <div class="col text-truncate">
            <span class="d-lg-none">
                <VehicleButton :modelValue="item.vehicle" class="p-1" />
                {{ getVehicle(item.vehicle).code }} -
            </span>
            <InterventionTypeButton :modelValue="item.interventionType" class="p-1" />
            {{ getInterventionType(item.interventionType)?.$title }}
        </div>
        <div class="col d-none d-lg-block text-truncate">
            <OperatorButton :modelValue="item.operator" class="p-1" />
            {{ getOperator(item.operator)?.$title }}
        </div>
        <div class="col text-truncate d-none d-md-block">{{ item.invoice?.invoiceNumber }}</div>
        <div class="col-auto d-none d-md-block">
            <ConfirmButton icon="delete" class="m-0 p-1" :modal-type="ModalType.danger" @confirm="$emit('request-remove', item)">Remove {{ item.$title }}?</ConfirmButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useVModelField, createFromComputedPool } from "@/regira_modules/vue/vue-helper"
import { formatDate, formatShortDate } from "@/regira_modules/vue/formatters"
import { ModalType, ConfirmButton } from "@/regira_modules/vue/ui"
import type { SaveResult } from "@/regira_modules/vue/entities"
import { FormModalButton as VehicleButton, useEntityStore as useVehicleStore } from "../../vehicles"
import { FormModalButton as OperatorButton, useEntityStore as useOperatorStore } from "../../intervention-operators"
import { FormModalButton as InterventionTypeButton, useEntityStore as useInterventionTypeStore } from "../../intervention-types"
import Entity from "../data/Entity"

const emit = defineEmits<{
    (e: "update:modelValue", args: Entity): void
    (e: "save", args: SaveResult<Entity>): void
    (e: "remove", args: Entity): void
    (e: "request-save", args: Entity): void
    (e: "request-remove", args: Entity): void
}>()
const props = defineProps<{
    modelValue: Entity
}>()

const item = useVModelField<Entity>(props, emit)

const getVehicle = createFromComputedPool(useVehicleStore()) as any
const getOperator = createFromComputedPool(useOperatorStore()) as any
const getInterventionType = createFromComputedPool(useInterventionTypeStore()) as any
</script>
