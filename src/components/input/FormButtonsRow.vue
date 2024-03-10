<template>
    <div class="buttons-row">
        <IconButton
            v-if="isArchived"
            type="button"
            icon="restore"
            button-label="Restore"
            class="btn-warning py-1 me-2"
            @click="emit('restore')"
            :disabled="status != '' && status != FeedbackStatus.failed"
        >
            <span class="d-none d-md-inline ms-1">Restore</span>
        </IconButton>
        <template v-else>
            <IconButton v-if="!isArchived" type="submit" icon="save" button-label="Save" class="btn-primary py-1 me-2" :disabled="readonly || (status != '' && status != FeedbackStatus.failed)">
                <span class="d-none d-md-inline ms-1">Save</span>
            </IconButton>
            <IconButton type="button" icon="cancel" button-label="Cancel" class="btn-secondary py-1 mx-2" @click="emit('cancel')" :disabled="readonly || !canCancel">
                <span class="d-none d-md-inline ms-1">Cancel</span>
            </IconButton>
            <ConfirmButton type="button" :modalType="ModalType.danger" class="btn-danger py-1 ms-2" :disabled="readonly" v-show="showDelete" @confirm="emit('remove')">
                <template #button-content>
                    <Icon name="delete" class="me-1" />
                    <span class="d-none d-md-inline">Delete</span>
                </template>
                <template #default>
                    <slot name="delete">Delete item '{{ item?.$title }}'?</slot>
                </template>
            </ConfirmButton>
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { FeedbackStatus, type FeedbackOut } from "@/regira_modules/vue/ui/feedback"
import { ConfirmButton, ModalType } from "@/regira_modules/vue/ui"
import type { IEntity } from "@/regira_modules/vue/entities"

const emit = defineEmits<{
    (e: "cancel"): void
    (e: "remove"): void
    (e: "restore"): void
}>()
const props = withDefaults(
    defineProps<{
        item?: IEntity
        readonly?: boolean
        feedback: FeedbackOut
        showDelete?: boolean
        canCancel?: boolean
    }>(),
    {
        showDelete: true,
        canCancel: true,
    }
)

type archivableItem = { isArchived: number | boolean }

const { status } = props.feedback

const isArchived = computed(() => !!(props.item as unknown as archivableItem).isArchived)
</script>
