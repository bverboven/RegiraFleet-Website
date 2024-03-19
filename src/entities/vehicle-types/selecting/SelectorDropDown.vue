<template>
    <select v-model="selected" class="form-select">
        <option value=""></option>
        <option v-for="item in items" :value="item.id" :key="item.id">
            {{ item.title }}
        </option>
    </select>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watchEffect, type Ref } from "vue"
import type Entity from "../data/Entity"
import useEntityStore from "../data/store"

const emit = defineEmits<{
    (e: "update:modelValue", args?: Entity): void
    (e: "update:idValue", args?: number): void
}>()
const props = defineProps<{
    modelValue?: Entity
    idValue?: number
}>()

const selected = computed({
    get() {
        return props.modelValue
    },
    set(value: any) {
        console.debug("setSelected", { value })
        const item = items.value?.find((x) => x.id == parseInt(value))
        emit("update:idValue", item?.id)
        emit("update:modelValue", item)
    },
})
const { fromCache } = useEntityStore()

const items = ref<Array<Entity>>()
const chachedRefItems = computed(() => fromCache() as Array<Ref<Entity>>)
watchEffect(() => {
    items.value = chachedRefItems.value!.map((x) => x.value)
})
onMounted(() => {
    console.debug("SelectorDropDown", { fromCache })
    if (items.value?.length && !selected.value && props.idValue) {
        selected.value = items.value.find((x) => x.id == props.idValue)
    }
})
</script>
