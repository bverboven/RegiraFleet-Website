<template>
    <FormSection title="Invoice">
        <Form v-model="item" :readonly="readonly" />
    </FormSection>
</template>

<script setup lang="ts">
import { type Entity as Operator } from "../"
import Entity from "./Entity"
import Form from "./Form.vue"
import { TaxCategory } from "./TaxCategory"

defineProps<{
    owner: Operator
    readonly?: boolean
}>()

const item = defineModel<Entity>({
    default: () => Object.assign(new Entity(), { taxCategory: TaxCategory.Deductible }),
})
</script>
