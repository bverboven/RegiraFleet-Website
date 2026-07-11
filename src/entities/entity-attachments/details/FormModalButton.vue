<template>
    <button type="button" class="btn btn-default" @click="isOpen = true">
        <slot><Icon name="file" /></slot>
        <Teleport to="#modals">
            <MyModal :is-visible="isOpen" title="Attachment" :showFooter="true" @close="handleCancel" @cancel="handleCancel" @submit="handleSubmit">
                <Form v-model="item" />
            </MyModal>
        </Teleport>
    </button>
</template>

<script setup lang="ts">
import { ref } from "vue"
import type { SaveResult } from "regira_modules/vue/entities"
import type Entity from "../data/Entity"
import Form from "./Form.vue"

const emit = defineEmits<{
    (e: "save", args: SaveResult<Entity>): void
    (e: "cancel"): void
}>()

const item = defineModel<Entity>({ default: () => ({ id: 0 }) as Entity })
const isOpen = ref(false)

function handleCancel() {
    emit("cancel")
    isOpen.value = false
}
function handleSubmit() {
    emit("save", { saved: item.value, isNew: item.value.id == 0 })
    isOpen.value = false
}
</script>
