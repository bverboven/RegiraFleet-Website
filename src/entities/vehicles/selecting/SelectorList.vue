<template>
    <div class="entity-list">
        <div class="row pb-2 border-bottom border-bottom-1">
            <div class="col-auto fw-bold"><Icon name="select" class="m-1" /></div>
            <div class="col-1 fw-bold">Code</div>
            <div class="col fw-bold">Model</div>
        </div>

        <template v-for="(item, i) in items" :key="item.$id">
            <div class="row border-bottom border-bottom-1 py-2" :class="{ 'is-selected': isSelected(item) }">
                <div class="col-auto">
                    <IconButton :icon="isSelected(item) ? 'selected' : 'select'" class="btn-default py-0 px-1" @click="handleSelect(item)" />
                </div>
                <div class="col text-truncate">
                    <FormModalButton v-model="items[i]" class="p-1" />
                    {{ item.code }}
                </div>
                <div class="col text-nowrap">
                    <BrandButton :modelValue="item.brand!" class="p-1" />
                    {{ getBrand(item.brand)?.title }}
                </div>
                <div class="col text-truncate">
                    {{ item.model }}
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { createFromComputedPool } from "@/regira_modules/vue/vue-helper"
import type { OverviewEmits } from "@/regira_modules/vue/entities"
import { FormModalButton as BrandButton, useEntityStore as useBrandStore } from "../../brands"
import type Entity from "../data/Entity"
import useEntityStore from "../data/store"
import FormModalButton from "../details/FormModalButton.vue"

interface Emits extends /* @vue-ignore */ OverviewEmits<Entity> {
    (e: "select", selected: Entity | null): void
}
const emit = defineEmits<Emits>()
const props = defineProps<{
    modelValue?: Array<Entity> | null
    selected?: Entity | null
}>()

const isSelected = computed(() => (item: Entity) => item.$id == props.selected?.$id)
const { fromPool } = useEntityStore()
const items = computed<Array<Entity>>({
    get: () => fromPool(props.modelValue || []),
    set: (value) => emit("update:modelValue", value),
})
const getBrand = createFromComputedPool(useBrandStore()) as any

function handleSelect(item: Entity) {
    emit("select", item?.$id !== props.selected?.$id ? item : null)
}
</script>
