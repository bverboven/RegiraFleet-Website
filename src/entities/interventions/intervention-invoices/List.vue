<template>
    <div>
        <div class="row border-bottom border-bottom-1 py-2">
            <div class="col-auto"><Icon name="edit" class="m-1 py-1 px-2" /></div>
            <div class="col fw-bold">{{ $t("invoiceNumber") }}</div>
            <div class="col d-none d-sm-block fw-bold">{{ $t("invoiceDate") }}</div>
            <div class="col-2 col-xl-1 d-none d-md-block fw-bold text-end">{{ $t("priceIncl") }}</div>
            <div v-if="!readonly" class="col-auto">
                <button type="button" class="btn btn-outline-danger py-1" disabled><Icon name="delete" /></button>
            </div>
        </div>
        <ListItem v-for="(item, index) in items" :key="item.id" v-model="items[index]" :readonly="readonly" :class="{ 'is-deleted': item._deleted, 'bg-light': !item._deleted && index % 2 == 0 }" />
    </div>
</template>

<script setup lang="ts">
import { useVModelField } from "@/regira_modules/vue/vue-helper"
import type Entity from "./Entity"
import ListItem from "./ListItem.vue"

const emit = defineEmits<{
    (e: "update:modelValue", args: Array<Entity>): void
}>()
const props = withDefaults(
    defineProps<{
        modelValue?: Array<Entity>
        readonly?: boolean
    }>(),
    {
        modelValue: () => [],
    }
)

const items = useVModelField<Array<Entity>>(props, emit)
</script>
