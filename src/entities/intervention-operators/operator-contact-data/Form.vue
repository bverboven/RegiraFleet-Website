<template>
    <div>
        <div class="row">
            <div class="col-md mb-2">
                <div class="input-group">
                    <ActionButton :item="item" class="btn btn-outline-secondary" />
                    <input v-focus v-model.trim="item.value" maxlength="256" class="form-control" :required="item.id != 0" placeholder="phone | email | website" @change="handleChangeValue" />
                </div>
                <FormLabel :label="item.dataType || 'Phone, Email, Website'" />
            </div>
        </div>
        <div class="row">
            <div class="col-md mb-2">
                <input v-model.trim="item.title" placeholder="home, work, private, ..." maxlength="32" class="form-control" />
                <FormLabel label="Title" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useVModelField } from "@/regira_modules/vue/vue-helper"
import type Entity from "./Entity"
import ActionButton from "./ActionButton.vue"
import { getDataType } from "./functions"

const emit = defineEmits<{
    (e: "update:modelValue", item: Entity): void
}>()
const props = defineProps<{
    modelValue: Entity
    readonly?: boolean
}>()

function handleChangeValue() {
    item.value.dataType = getDataType(item.value)
}
const item = useVModelField<Entity>(props, emit)
</script>
