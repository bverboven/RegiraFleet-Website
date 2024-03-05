<template>
    <select v-model="selected" class="form-select">
        <slot name="empty"><option :value="null"></option></slot>
        <option v-for="item in items" :value="item">{{ item.code }} - {{ item.$title }}</option>
    </select>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, type Ref } from "vue"
import { useAppStore } from "@/regira_modules/vue/app"
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

const items = ref<Array<Entity>>()
const selected = computed<Entity | undefined>({
    get() {
        // v-model on object only works when objects have the same pointer reference -> fromCache (see below in watchEffect)
        return items.value?.find((x) => x.id == props.idValue)
    },
    set(value) {
        emit("update:idValue", value?.id)
        emit("update:modelValue", value)
    },
})
const { fromCache } = useEntityStore()

const appStore = useAppStore()
watchEffect(() => {
    if (appStore.isReady) {
        items.value = (fromCache() as Array<Ref<Entity>>)!.map((x) => x.value)
        if (!selected.value && props.idValue) {
            selected.value = items.value.find((x) => x.id == props.idValue)
        }
    }
})
</script>
