<template>
    <div class="row g-1">
        <div v-for="(item, i) in items" :key="item.id" class="col-auto" :class="{ 'is-deleted': item._deleted }">
            <div class="text-nowrap p-2 border rounded-1">
                <FormModalButton v-model="items![i]" :readonly="readonly" class="m-0 p-0" />
                {{ item.title }}
                <IconButton v-if="!readonly" icon="delete" class="m-0 py-0 px-1" @click="handleRemove(item)" />
            </div>
        </div>
        <div v-if="!readonly" class="col-auto">
            <InputSelector v-model="newItem" :filter-defaults="filterDefaults" :placeholder="placeholder" @select="handleSelect" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import useEntityStore from "../data/store"
import type Entity from "../data/Entity"
import FormModalButton from "../details/FormModalButton.vue"
import InputSelector from "./InputSelector.vue"

const emit = defineEmits<{
    (e: "update:modelValue", args: Array<Entity>): void
    (e: "update:idsValue", args: Array<number>): void
}>()
const props = defineProps<{
    modelValue?: Array<Entity>
    idsValue?: Array<number>
    readonly?: boolean
    placeholder?: string
    filterDefaults?: Record<string, any>
}>()

const { fromPool, list } = useEntityStore()
const items = computed<Array<Entity>>({
    get: () => props.modelValue || [] as Array<Entity>,
    set: (value) => emit("update:modelValue", value as Array<Entity>),
})

const newItem = ref<Entity>()
function handleSelect(selected?: Entity) {
    if (selected == null) {
        return
    }

    const alreadySelected = items.value.find((x) => x.id == selected.id)
    if (alreadySelected != null) {
        alreadySelected._deleted = false
    } else if (items.value.every((x) => x.$id != selected?.$id)) {
        const newVal = [...items.value, selected]
        emit(
            "update:idsValue",
            newVal.map((x) => x.id!)
        )
        emit("update:modelValue", newVal)
    }
    newItem.value = undefined
}
function handleRemove(selected: Entity) {
    selected._deleted = !selected._deleted
    const newVal = [...items.value]
    emit(
        "update:idsValue",
        newVal.map((x) => x.id!)
    )
    emit("update:modelValue", newVal)
}

onMounted(async () => {
    console.debug("Selector", { modelValue: props.modelValue, ids: props.idsValue })
    if ((props.idsValue?.length || 0) > 0 && props.modelValue?.length != props.idsValue?.length) {
        const models = await list({ id: props.idsValue })
        emit("update:modelValue", models)
    }
})
</script>
