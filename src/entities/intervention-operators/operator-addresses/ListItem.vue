<template>
    <div class="row">
        <div class="col-md mb-2">
            <div class="input-group">
                <span v-if="!readonly" class="input-group-text drag-handle cursor move">
                    <Icon name="move" />
                </span>
                <AddressButton :modelValue="item" class="btn btn-outline-info" />
                <div class="form-control">
                    {{ address }}
                </div>
                <FormModalButton v-model="item" :readonly="readonly" class="btn btn-outline-secondary"><Icon name="edit" /></FormModalButton>
                <button v-if="!readonly && item.id != 0" type="button" class="btn btn-outline-danger" @click="item._deleted = !item._deleted"><Icon name="delete" /></button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useVModelField } from "@/regira_modules/vue/vue-helper"
import { format } from "./formatter"
import type Entity from "./Entity"
import FormModalButton from "./FormModalButton.vue"
import AddressButton from "./AddressButton.vue"

const emit = defineEmits<{
    (e: "update:modelValue", item: Entity): void
}>()
const props = defineProps<{
    modelValue: Entity
    readonly?: boolean
}>()

const item = useVModelField<Entity>(props, emit)
const address = computed(() => format(item.value))
</script>
