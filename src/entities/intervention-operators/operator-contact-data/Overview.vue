<template>
    <FormSection title="Contact data" :readonly="readonly" :show-summary="(stakeholder?.id || 0) > 0">
        <List v-model="items" />

        <div class="row">
            <div class="col-md mb-2">
                <div class="input-group">
                    <div class="input-group-text">
                        <Icon name="connect" />
                    </div>
                    <input
                        v-model.trim="newContactData"
                        maxlength="256"
                        class="form-control"
                        @blur="handleAddNew"
                        @keydown.enter.prevent="handleAddNew"
                        placeholder="add new phone, email, website"
                        autocomplete="__away"
                        ref="newContactDataInput"
                    />
                    <button type="button" @click.prevent="handleAddNew" class="btn btn-outline-info"><Icon name="new" /></button>
                </div>
            </div>
        </div>
        <template #summary>
            <template v-if="items?.length">
                <div v-for="item in items" class="mb-2">
                    <div class="input-group">
                        <ActionButton :item="item" class="btn btn-outline-info" />
                        <input v-model="item.value" class="form-control" />
                        <span class="input-group-text" v-if="item.title != null">{{ item.title }}</span>
                    </div>
                </div>
            </template>
            <div v-else class="italic-muted">no items</div>
        </template>
    </FormSection>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useOwnedCollection } from "@/regira_modules/vue/entities"
import type { Entity as Stakeholder } from "../"
import { Entity, List, ActionButton, getDataType } from "./"

const emit = defineEmits<{
    (e: "update:modelValue", args: Array<Entity>): void
    (e: "sort", args: any): void
}>()
const props = withDefaults(
    defineProps<{
        modelValue?: Array<Entity>
        stakeholder?: Stakeholder
        readonly?: boolean
        showSummary?: boolean
    }>(),
    {
        modelValue: () => [],
    }
)

const { items, handleSave } = useOwnedCollection({ props, emit })

const newContactData = ref<string>()
const newContactDataInput = ref<any>(null)
function handleAddNew() {
    if (!newContactData.value) {
        return
    }

    handleSave({ saved: Object.assign(new Entity(), { value: newContactData.value, dataType: getDataType(newContactDataInput.value) }), isNew: true })
    newContactData.value = ""
    newContactDataInput.value?.focus()
}
</script>
