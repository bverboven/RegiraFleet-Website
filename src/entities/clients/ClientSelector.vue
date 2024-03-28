<template>
    <div class="list-group">
        <button v-for="item in items" :key="item.id" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" @click="store.setActiveClient(item.id)">
            {{ item.title }}
            <span class="badge text-bg-success rounded-pill cursor pointer ms-2" :class="item.id == activeClient?.id ? 'opacity-100' : 'opacity-25'">
                <Icon name="check" />
            </span>
        </button>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useEntityStore } from "./store"

const store = useEntityStore()
const { items, activeClient } = storeToRefs(store)
</script>
