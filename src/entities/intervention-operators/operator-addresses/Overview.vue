<template>
    <FormSection title="Address(es)">
        <List v-model="items" :readonly="readonly" />

        <div v-if="!readonly" class="row mt-2">
            <div class="col mb-2">
                <FormModalButton :modal-title="`Address for ${owner.$title}`" :item-defaults="defaultValues" class="btn btn-info" @save="handleSave">Add new address</FormModalButton>
            </div>
        </div>
    </FormSection>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useOwnedCollection } from "@/regira_modules/vue/entities"
import { type Entity as Operator } from "../"
import type Entity from "./Entity"
import List from "./List.vue"
import FormModalButton from "./FormModalButton.vue"

const emit = defineEmits<{
    (e: "update:modelValue", args: Array<Entity>): void
    (e: "sort", args: any): void
}>()
const props = withDefaults(
    defineProps<{
        modelValue?: Array<Entity>
        owner: Operator
        readonly?: boolean
        showSummary?: boolean
    }>(),
    {
        modelValue: () => [],
    }
)

const { items, handleSave } = useOwnedCollection({ props, emit })

// set default countryCode
const defaultValues = ref({ countryCode: "BE" })
</script>
