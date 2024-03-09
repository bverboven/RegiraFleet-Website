<template>
    <div class="row border-bottom border-bottom-1 py-2">
        <div class="col-auto">
            <FormModalButton v-model="item" class="btn btn-link py-1" />
        </div>
        <div class="col">
            {{ item.invoiceNumber }}
        </div>
        <div class="col d-none d-sm-block">
            {{ formatDate(item.invoiceDate) }}
        </div>
        <div class="col-2 col-xl-1 d-none d-md-block text-end">
            {{ formatCurrency(item.priceIncl, $culture) }}
        </div>
        <div class="col-auto">
            <button v-if="item.id != 0" type="button" class="btn btn-outline-danger py-1" @click="item._deleted = !item._deleted"><Icon name="delete" /></button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useVModelField } from "@/regira_modules/vue/vue-helper"
import { formatCurrency, formatDate } from "@/regira_modules/vue/formatters"
import type Entity from "./Entity"
import FormModalButton from "./FormModalButton.vue"

const emit = defineEmits<{
    (e: "update:modelValue", item: Entity): void
}>()
const props = defineProps<{
    modelValue: Entity
    readonly?: boolean
}>()

const item = useVModelField<Entity>(props, emit)
</script>
