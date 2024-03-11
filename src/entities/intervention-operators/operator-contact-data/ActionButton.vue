<template>
    <MyAnchor v-if="href" :href="href" :target="dataType == ContactDataTypes.website ? '_blank' : undefined"><ContactDataIcon :type="dataType" /></MyAnchor>
    <button v-else disabled><ContactDataIcon :type="dataType" /></button>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { getDataType } from "./functions"
import ContactDataTypes from "./ContactDataTypes"
import type Entity from "./Entity"
import ContactDataIcon from "./ContactDataIcon.vue"

const props = defineProps<{
    item?: Entity
}>()

const dataType = computed(() => getDataType(props.item))
const href = computed(() => {
    switch (dataType.value) {
        case ContactDataTypes.phone:
        case ContactDataTypes.mobile:
            return `tel:${props.item!.value}`
        case ContactDataTypes.email:
            return `mailto:${props.item!.value}`
        case ContactDataTypes.website:
            return props.item!.value
        default:
            return undefined
    }
})
</script>
