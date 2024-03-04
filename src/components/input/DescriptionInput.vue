<template>
    <div class="row">
        <div class="col-xl mb-2">
            <MarkDownInput v-model="item.description" placeholder="description" />
            <FormLabel label="Description" /><Icon name="markdown" class="px-1" />
        </div>
        <div class="w-100" v-if="stacked"></div>
        <div class="col-xl mb-2">
            <textarea class="form-control" v-model="item.notes" placeholder="notes" />
            <FormLabel label="Notes" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useVModelField } from "@/regira_modules/vue/vue-helper"
import { MarkDownInput } from "@/regira_modules/vue/ui"

type Model = {
    description?: string
    notes?: string
}

const emit = defineEmits<{
    (e: "update:modelValue", args: Model): void
}>()
const props = defineProps<{
    modelValue: Model
    stacked?: boolean
}>()

const item = useVModelField<Model>(props, emit)
</script>
