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
import { useConfig } from "@/app-config"
import { useEntityStore as useTenantStore } from "@/entities/tenants"
import type { IHasTranslations } from "./IHasTranslations"
import Form from "./Form.vue"
import Entity from "./Entity"

const item = defineModel<IHasTranslations>({ required: true })

const { activeTenant } = storeToRefs(useTenantStore())
const { cultures } = useConfig()
const translations = computed<Array<Entity>>(() =>
    Object.entries(cultures)
        .filter(([culture]) => activeTenant.value?.defaultCulture != culture)
        .map(([culture]) => item.value.translations?.find((t) => t.culture == culture) ?? Object.assign(new Entity(), { culture }))
)

function updateTranslations() {
    item.value.translations = translations.value
}
</script>
