<template>
    <FormSection>
        <template #title>
            <div class="d-flex justify-content-between">
                <h3 class="p-2 mb-2">Interventions</h3>
                <InterventionButton :item-defaults="{ vehicle: owner, vehicleId: owner?.id }" class="btn btn-info py-1 my-1" @save="load"><Icon name="new" /></InterventionButton>
            </div>
        </template>
        <div class="row pb-2 border-bottom border-bottom-1">
            <div class="col-auto fw-bold"><Icon name="edit" class="m-1" /></div>
            <div class="col-2 col-xl-1 fw-bold">Date</div>
            <div class="col fw-bold">
                <span class="d-none d-lg-block">Type(s)</span>
            </div>
            <div class="col d-none d-lg-block fw-bold">Supplier</div>
            <div class="col d-none d-md-block fw-bold">Invoice(s)</div>
        </div>
        <div v-for="item in items" class="row border-bottom border-bottom-1 py-2">
            <div class="col-auto">
                <InterventionButton :modelValue="item" class="p-1" />
            </div>
            <div class="col-2 col-xl-1">
                <div class="italic-muted">{{ formatDate(item.interventionDate, $culture) }}</div>
            </div>
            <div class="col text-truncate">
                {{ interventionTypes(item) }}
            </div>
            <div class="col d-none d-lg-block text-truncate">
                <OperatorButton :modelValue="item.operator" class="p-1" />
                {{ getOperator(item.operator).$title }}
            </div>
            <div class="col text-truncate d-none d-md-block">{{ item.invoices?.map((x) => x.invoiceNumber).join(", ") }}</div>
        </div>
    </FormSection>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { get } from "@/regira_modules/vue/ioc"
import { createFromComputedPool } from "@/regira_modules/vue/vue-helper"
import { formatDate } from "@/regira_modules/vue/formatters"
import type Vehicle from "../data/Entity"
import { Entity, type EntityService, FormModalButton as InterventionButton } from "../../interventions"
import { FormModalButton as OperatorButton, useEntityStore as useOperatorStore } from "../../intervention-operators"

const props = defineProps<{
    owner: Vehicle
}>()

const service = get<EntityService>(Entity.name)!
const items = ref<Array<Entity>>()

const interventionTypes = computed(() => (item: Entity) => item.interventionTypes?.map((x) => x.title).join(", "))

const getOperator = createFromComputedPool(useOperatorStore()) as any

async function load() {
    items.value = await service.list({ vehicleId: props.owner.id })
}

onMounted(load)
</script>
