<template>
    <FormSection>
        <template #title>
            <div class="d-flex justify-content-between">
                <h3 class="p-2 mb-2">{{ $t("interventions") }}</h3>
                <InterventionButton v-if="!readonly" :item-defaults="{ vehicle: owner, vehicleId: owner?.id }" class="btn btn-info py-1 my-1" @save="load"><Icon name="new" /></InterventionButton>
            </div>
        </template>
        <LoadingContainer :is-loading="isLoading">
            <div class="row pb-2 border-bottom border-bottom-1">
                <div class="col-auto fw-bold"><Icon name="edit" class="m-1" /></div>
                <div class="col-3 col-md-2 col-xl-1 fw-bold">{{ $t("date") }}</div>
                <div class="col fw-bold">{{ $t("type") }}</div>
                <div class="col d-none d-lg-block fw-bold">{{ $t("supplier") }}</div>
                <div class="col d-none d-md-block fw-bold">{{ $t("invoice") }}</div>
            </div>
            <div v-for="item in items" :key="item.id" class="row border-bottom border-bottom-1 py-2">
                <div class="col-auto">
                    <InterventionButton :modelValue="item" :readonly="readonly" class="p-1" />
                </div>
                <div class="col-3 col-md-2 col-xl-1">
                    <div class="italic-muted">{{ formatDate(item.interventionDate, $culture) }}</div>
                </div>
                <div class="col text-truncate">
                    <InterventionTypeButton :modelValue="item.interventionType" class="p-1" />
                    {{ getInterventionType(item.interventionType)?.$title }}
                </div>
                <div class="col d-none d-lg-block text-truncate">
                    <OperatorButton :modelValue="item.operator" :readonly="readonly" class="p-1" />
                    {{ getOperator(item.operator).$title }}
                </div>
                <div class="col text-truncate d-none d-md-block">{{ item.invoice?.invoiceNumber }}</div>
            </div>
        </LoadingContainer>
    </FormSection>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { get } from "@/regira_modules/vue/ioc"
import { createFromComputedPool } from "@/regira_modules/vue/vue-helper"
import { formatDate } from "@/regira_modules/vue/formatters"
import type Vehicle from "../data/Entity"
import { Entity, type EntityService, FormModalButton as InterventionButton } from "../../interventions"
import { FormModalButton as OperatorButton, useEntityStore as useOperatorStore } from "../../intervention-operators"
import { FormModalButton as InterventionTypeButton, useEntityStore as useInterventionTypeStore } from "../../intervention-types"

const props = defineProps<{
    owner: Vehicle
    readonly?: boolean
}>()

const service = get<EntityService>(Entity.name)!
const items = ref<Array<Entity>>()
const isLoading = ref(false)

const getOperator = createFromComputedPool(useOperatorStore()) as any
const getInterventionType = createFromComputedPool(useInterventionTypeStore()) as any

async function load() {
    try {
        isLoading.value = true
        items.value = await service.list({ vehicleId: props.owner.id })
    } finally {
        isLoading.value = false
    }
}

onMounted(load)
</script>
