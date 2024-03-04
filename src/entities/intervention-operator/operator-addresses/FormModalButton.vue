<template>
    <button type="button" class="btn btn-default" @click="handleOpen">
        <slot><Icon name="connect" /></slot>
        <Teleport to="#modals">
            <Modal v-if="isOpen" :title="modalTitle" :showFooter="true" @close="handleCancel" @cancel="handleCancel" @submit="handleSubmit">
                <Form v-model="item" :item-defaults="itemDefaults" />
            </Modal>
        </Teleport>
    </button>
</template>

<script setup lang="ts">
import type { Ref } from "vue"
import { useOwnedModal, type SaveResult } from "@/regira_modules/vue/entities"
import Entity from "./Entity"
import Form from "./Form.vue"

const emit = defineEmits<{
    (e: "update:modelValue", args?: Entity): void
    (e: "save", args: SaveResult<Entity>): void
    (e: "cancel"): void
}>()
const props = defineProps<{
    modelValue?: Entity
    itemDefaults?: Ref<Record<string, any>> | Record<string, any>
    modalTitle?: string
}>()

const { item, isOpen, handleOpen, handleCancel, handleSubmit } = useOwnedModal(Entity, { props, emit })
</script>
