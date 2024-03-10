<template>
    <div class="row border-bottom border-bottom-1 py-2">
        <div class="col-auto">
            <router-link :to="{ name: Entity.name + 'Details', params: { id: item.$id } }" class="btn btn-link p-1">
                <Icon :name="Entity.name" />
            </router-link>
        </div>
        <div class="col-1 text-truncate">
            {{ item.code }}
        </div>
        <div class="col text-truncate">
            {{ item.$title }}
        </div>
        <div class="col d-none d-sm-block">
            <template v-if="item.$address != null"><AddressButton :modelValue="item.$address" :readonly="readonly" class="btn btn-default p-1" /> {{ getLocation(item) }}</template>
        </div>
        <div class="col d-none d-lg-block text-truncate">
            <template v-if="item.contactData?.length">
                <div v-for="cd in getContactData(item)" class="mb-1 text-nowrap">
                    <ActionButton :item="cd" class="p-1" :title="cd.value" />
                    {{ cd.value }}
                </div>
            </template>
        </div>
        <div v-if="!readonly" class="col-auto d-none d-md-block">
            <ConfirmButton icon="delete" class="m-0 p-1" :modal-type="ModalType.danger" @confirm="$emit('request-remove', item)">Remove {{ item.$title }}?</ConfirmButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { distinctBy } from "@/regira_modules/utilities/array-utility"
import { useVModelField } from "@/regira_modules/vue/vue-helper"
import { ModalType, ConfirmButton } from "@/regira_modules/vue/ui"
import type { SaveResult } from "@/regira_modules/vue/entities"
import Entity from "../data/Entity"
import { AddressButton, formatCity } from "../operator-addresses"
import { Entity as ContactData, ActionButton } from "../operator-contact-data"

const emit = defineEmits<{
    (e: "update:modelValue", args: Entity): void
    (e: "save", args: SaveResult<Entity>): void
    (e: "remove", args: Entity): void
    (e: "request-save", args: Entity): void
    (e: "request-remove", args: Entity): void
}>()
const props = defineProps<{
    modelValue: Entity
    readonly?: boolean
}>()

const item = useVModelField<Entity>(props, emit)
const getContactData = computed(() => (item: Entity) => distinctBy(item.contactData || [], (cd: ContactData) => cd.dataType) as Array<ContactData>)

const getLocation = computed(() => (item: Entity) => formatCity(item.$address))
</script>
