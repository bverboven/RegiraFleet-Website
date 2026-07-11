<template>
    <Draggable v-model="items" item-key="id" handle=".drag-handle" ghost-class="ghost">
        <template #item="{ element, index }">
            <ListItem v-model="items[index]" :class="{ 'is-deleted': element._deleted }" :readonly="readonly" />
        </template>
    </Draggable>
</template>

<script setup lang="ts">
import Draggable from "vuedraggable"
import type Entity from "../data/Entity"
import ListItem from "./ListItem.vue"

defineProps<{
    readonly?: boolean
}>()

const items = defineModel<Array<Entity>>({ default: () => [] })
</script>
