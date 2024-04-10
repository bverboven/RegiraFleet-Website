<template>
    <div v-for="(translation, i) in translations" :key="translation.culture" class="row">
        <div class="col mb-2">
            <Form :modelValue="translations[i]" @update:modelValue="updateTranslations" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { storeToRefs } from "pinia"
import { useVModelField } from "@/regira_modules/vue"
import { useConfig } from "@/app-config"
import { useEntityStore as useClientStore } from "@/entities/clients"
import type { IHasTranslations } from "./IHasTranslations"
import Form from "./Form.vue"
import Entity from "./Entity"

const emit = defineEmits<{
    (e: "update:modelValue", arg: IHasTranslations): void
}>()
const props = defineProps<{
    modelValue: IHasTranslations
}>()

const item = useVModelField<IHasTranslations>(props, emit)

const { activeClient } = storeToRefs(useClientStore())
const { cultures } = useConfig()
const translations = computed<Array<Entity>>(() =>
    Object.entries(cultures)
        .filter(([culture]) => activeClient.value?.defaultCulture != culture)
        .map(([culture]) => item.value.translations?.find((t) => t.culture == culture) ?? Object.assign(new Entity(), { culture }))
)

function updateTranslations() {
    item.value.translations = translations.value
    emit("update:modelValue", item.value)
}
</script>
