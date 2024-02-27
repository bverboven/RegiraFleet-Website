<template>
    <button type="button" class="btn btn-default" @click="open">
        <slot><Icon name="search" /></slot>
        <Teleport to="#modals">
            <Modal v-if="isOpen" title="Select" :showFooter="true" :full-width="true" @close="close" @cancel="handleCancel" @submit="handleSubmit">
                <SelectorSearch v-model="selected" :filter-defaults="filterDefaults" :page-size="5" />
            </Modal>
        </Teleport>
    </button>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue"
import type Entity from "../data/Entity"
import SelectorSearch from "./SelectorSearch.vue"

const emit = defineEmits<{
    (e: "update:modelValue", selected?: Entity): void
    (e: "change", selected?: Entity): void
}>()
const props = defineProps<{
    modelValue?: Entity
    filterDefaults?: Record<string, any>
}>()

const selected = ref<Entity>()
const isOpen = ref(false)

function open() {
    selected.value = props.modelValue
    isOpen.value = true
}
function close() {
    isOpen.value = false
}
function handleCancel() {
    console.debug("handleCancel")
    close()
}
function handleSubmit() {
    console.debug("handleSubmit")
    emit("update:modelValue", selected.value)
    emit("change", selected.value)
    close()
}

watchEffect(() => (selected.value = props.modelValue))
</script>
