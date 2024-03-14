<template>
    <FormSection :title="$t('contactData')">
        <List v-if="items?.length" v-model="items" :readonly="readonly" />
        <p v-else class="text-info">{{ $t("noItems") }}</p>

        <div v-if="!readonly" class="row">
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
                        :placeholder="$t('addContactData')"
                        autocomplete="__away"
                        ref="newContactDataInput"
                    />
                    <button type="button" @click.prevent="handleAddNew" class="btn btn-outline-info"><Icon name="new" /></button>
                </div>
            </div>
        </div>
    </FormSection>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useOwnedCollection } from "@/regira_modules/vue/entities"
import type { Entity as Owner } from "../"
import { Entity, List, getDataType } from "./"

const emit = defineEmits<{
    (e: "update:modelValue", args: Array<Entity>): void
    (e: "sort", args: any): void
}>()
const props = withDefaults(
    defineProps<{
        modelValue?: Array<Entity>
        owner?: Owner
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
