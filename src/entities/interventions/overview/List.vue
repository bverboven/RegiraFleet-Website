<template>
    <div class="entity-list">
        <div class="row pb-2 border-bottom border-bottom-1">
            <div class="col-auto fw-bold"><Icon name="edit" class="m-1" /></div>
            <div class="col-2 col-md-1 fw-bold">{{ $t("date") }}</div>
            <div class="col-3 col-sm-2 col-lg fw-bold">{{ $t("vehicle") }}</div>
            <div class="col fw-bold">{{ $t("intervention") }}</div>
            <div class="col d-none d-lg-block fw-bold">{{ $t("supplier") }}</div>
            <div class="col d-none d-md-block fw-bold">{{ $t("invoice") }}</div>
            <div class="col-auto d-none d-md-block fw-bold"><Icon name="delete" class="text-muted m-1" /></div>
        </div>
        <template v-for="(item, i) in items" :key="item.$id">
            <ListItem
                v-model="items[i]"
                :class="{ 'bg-light': i % 2 == 0 }"
                @request-save="$emit('request-save', $event)"
                @request-remove="$emit('request-remove', $event)"
                @save="$emit('save', $event)"
                @remove="$emit('remove', $event)"
            />
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import type { OverviewEmits } from "@/regira_modules/vue/entities"
import useEntityStore from "../data/store"
import type Entity from "../data/Entity"
import ListItem from "./ListItem.vue"

interface Emits extends /* @vue-ignore */ OverviewEmits<Entity> {}
const emit = defineEmits<Emits>()
const props = defineProps<{
    modelValue?: Array<Entity>
}>()

const { fromPool } = useEntityStore()

const items = computed<Array<Entity>>({
    get: () => fromPool(props.modelValue || []),
    set: (value) => emit("update:modelValue", value),
})
</script>
