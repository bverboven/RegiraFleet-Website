<template>
    <div class="row mb-2">
        <div class="col">
            <div class="input-group" :class="{ 'is-deleted': !item.permissions?.length }">
                <div class="input-group-text">
                    <Loading v-if="isLoading" style="height: 1.5rem" />
                    <Icon v-else name="user" />
                </div>
                <div class="form-control">
                    {{ item.email }}
                </div>
                <div class="input-group-text">
                    <label class="form-check-label mx-1">
                        <input type="checkbox" v-model="item.permissions" :value="Permissions.CAN_READ" class="form-check-input" @click="toggleCanRead" @change="handleUpdateUser" />
                        Read
                    </label>
                    <label class="form-check-label mx-1">
                        <input type="checkbox" v-model="item.permissions" :value="Permissions.CAN_WRITE" class="form-check-input" @click="toggleCanWrite" @change="handleUpdateUser" />
                        Write
                    </label>
                </div>
                <IconButton icon="delete" class="btn-outline-danger py-1" @click="handleRemoveUser" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useVModelField } from "@/regira_modules/vue/vue-helper"
import { Loading } from "@/regira_modules/vue/ui"
import Permissions from "@/infrastructure/permissions"
import Entity from "./Entity"
import { saveUser } from "./functions"

const emit = defineEmits<{
    (e: "update:modelValue", arg: Entity): void
}>()
const props = defineProps<{
    modelValue: Entity
}>()

const isLoading = ref(false)
const item = useVModelField<Entity>(props, emit)

function toggleCanRead() {
    if (item.value.permissions.includes(Permissions.CAN_READ) && item.value.permissions.includes(Permissions.CAN_WRITE)) {
        item.value.permissions = []
    }
}
function toggleCanWrite() {
    if (!item.value.permissions.includes(Permissions.CAN_READ) && !item.value.permissions.includes(Permissions.CAN_WRITE)) {
        item.value.permissions = [Permissions.CAN_READ, Permissions.CAN_WRITE]
    }
}
async function handleUpdateUser() {
    isLoading.value = true
    try {
        await saveUser(item.value)
        emit("update:modelValue", item.value)
    } finally {
        isLoading.value = false
    }
}
async function handleRemoveUser() {
    const itemWithoutPermissions = Object.assign(new Entity(), { ...item.value, permissions: [] })
    isLoading.value = true
    try {
        await saveUser(itemWithoutPermissions)
        emit("update:modelValue", itemWithoutPermissions)
    } finally {
        isLoading.value = false
    }
}
</script>
