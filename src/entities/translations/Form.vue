<template>
    <div class="input-group">
        <span class="input-group-text">{{ cultures[item.culture] }}</span>
        <input v-model="item.title" @change="emit('update:modelValue', item)" class="form-control" />
    </div>
    <FormLabel :label="`${$t('name')} ${cultures[item.culture]}`" />
</template>

<script setup lang="ts">
import { useVModelField } from "@/regira_modules/vue"
import { useConfig } from "@/app-config"
import Entity from "./Entity"

const emit = defineEmits<{
    (e: "update:modelValue", arg: Entity): void
}>()
const props = defineProps<{
    modelValue: Entity
}>()

const { cultures } = useConfig()
const item = useVModelField<Entity>(props, emit)
</script>
