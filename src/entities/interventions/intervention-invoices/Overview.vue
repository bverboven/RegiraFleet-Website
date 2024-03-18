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
import { useVModelField } from "@/regira_modules/vue/vue-helper"

const emit = defineEmits<{
    (e: "update:modelValue", args: Entity): void
}>()
const props = withDefaults(
    defineProps<{
        modelValue?: Entity
        owner: Operator
        readonly?: boolean
    }>(),
    {
        modelValue: () => Object.assign(new Entity(), { taxCategory: TaxCategory.Deductible }),
    }
)

const item = useVModelField<Entity>(props, emit)
</script>
