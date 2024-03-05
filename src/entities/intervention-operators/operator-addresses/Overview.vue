<template>
    <FormSection title="Address(es)" :readonly="readonly" :show-summary="(stakeholder?.id || 0) > 0">
        <List v-model="items" />

        <div class="row mt-2">
            <div class="col mb-2">
                <FormModalButton :modal-title="`Address for ${stakeholder.$title}`" :item-defaults="defaultValues" class="btn btn-info" @save="handleSave">Add new address</FormModalButton>
            </div>
        </div>
        <template #summary>
            <template v-if="modelValue?.length">
                <AddressDisplay v-for="address in modelValue" :address="address" />
            </template>
            <template v-else>
                <slot name="empty">
                    <div class="italic-muted">no items</div>
                </slot>
            </template>
            <slot name="inherited"></slot>
        </template>
    </FormSection>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue"
import { useOwnedCollection } from "@/regira_modules/vue/entities"
import { type Entity as Stakeholder, useEntityStore } from "../"
import type Entity from "./Entity"
import List from "./List.vue"
import FormModalButton from "./FormModalButton.vue"
import AddressDisplay from "./AddressDisplay.vue"

const emit = defineEmits<{
    (e: "update:modelValue", args: Array<Entity>): void
    (e: "sort", args: any): void
}>()
const props = withDefaults(
    defineProps<{
        modelValue?: Array<Entity>
        stakeholder: Stakeholder
        readonly?: boolean
        showSummary?: boolean
    }>(),
    {
        modelValue: () => [],
    }
)

const { items, handleSave } = useOwnedCollection({ props, emit })

// set default countryCode equal to active supplier's address
const defaultValues = ref({})
watchEffect(() => {
    const store = useEntityStore()
    console.debug("defaultAddress", { store, activeSupplier: store.activeSupplier })
    defaultValues.value = { countryCode: store.activeSupplier?.$address?.countryCode }
})
</script>
