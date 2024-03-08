<template>
    <form class="row row-cols-auto align-items-center" @submit.prevent="$emit('fetch-data')">
        <div class="row">
            <div class="col">
                <input type="number" v-model="filter.year" class="form-control" @change="handleChange" />
            </div>
            <div class="col-auto">
                <button type="submit" class="btn btn-primary p-1">Submit</button>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-success py-1" @click="$emit('fetch-doc', 'xlsx')"><Icon name="xlsx" /></button>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { useVModelField } from "@/regira_modules/vue/vue-helper"

const emit = defineEmits<{
    (e: "update:modelValue", arg: Record<string, any>): void
    (e: "fetch-data"): void
    (e: "fetch-doc", type: string): void
}>()
const props = withDefaults(
    defineProps<{
        modelValue: { year?: number }
    }>(),
    { modelValue: () => ({ year: new Date().getFullYear() }) }
)

const filter = useVModelField<{ year?: number }>(props, emit)
function handleChange() {
    emit("update:modelValue", { ...filter.value })
    emit("fetch-data")
}
</script>
