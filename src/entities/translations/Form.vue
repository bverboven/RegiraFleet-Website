<template>
    <div class="input-group">
        <span class="input-group-text">{{ cultures[item.culture] }}</span>
        <input v-model="item.title" class="form-control" />
    </div>
    <FormLabel :label="`${$t('name')} ${cultures[item.culture]}`" />
</template>

<script setup lang="ts">
import { useConfig } from "@/app-config"
import Entity from "./Entity"

const { cultures } = useConfig()
const item = defineModel<Entity>({ required: true })
</script>
