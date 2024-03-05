<template>
    <div class="row border-bottom border-bottom-1 py-2">
        <div class="col-auto">
            <router-link :to="{ name: Entity.name + 'Details', params: { id: item.$id } }" class="btn btn-link p-1">
                <Icon :name="Entity.name" />
            </router-link>
        </div>
        <div class="col text-truncate">
            {{ interventionTypes(item) }}
        </div>
        <div class="col text-truncate">
            <OperatorButton :modelValue="item.operator" class="p-1 me-1" />
            {{ getOperator(item.operator).$title }}
        </div>
        <div class="col text-truncate">
            <VehicleButton :modelValue="item.vehicle" class="p-1 me-1" />
            {{ getVehicle(item.vehicle).code }} <span class="text-muted">({{ getVehicle(item.vehicle).$title }})</span>
        </div>
        <div class="col-auto d-none d-md-block">
            <ConfirmButton icon="delete" class="m-0 p-1" :modal-type="ModalType.danger" @confirm="$emit('request-remove', item)">Remove {{ item.$title }}?</ConfirmButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useVModelField, createFromComputedPool } from "@/regira_modules/vue/vue-helper"
import { ModalType, ConfirmButton } from "@/regira_modules/vue/ui"
import type { SaveResult } from "@/regira_modules/vue/entities"
import { FormModalButton as VehicleButton, useEntityStore as useVehicleStore } from "../../vehicles"
import { FormModalButton as OperatorButton, useEntityStore as useOperatorStore } from "../../intervention-operators"
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

const interventionTypes = computed(() => (item: Entity) => item.interventionTypes?.map((x) => x.title).join(", "))

const getVehicle = createFromComputedPool(useVehicleStore()) as any
const getOperator = createFromComputedPool(useOperatorStore()) as any
</script>
