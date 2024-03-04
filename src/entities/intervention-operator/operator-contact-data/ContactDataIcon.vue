<template>
    <Icon :name="icon" />
</template>

<script setup lang="ts">
import { computed } from "vue"
import ContactDataTypes from "./ContactDataTypes"

const props = defineProps<{
    type?: string
}>()

const icon = computed(() =>
    props.type == ContactDataTypes.phone
        ? "phone"
        : props.type == ContactDataTypes.mobile
        ? "mobilePhone"
        : props.type == ContactDataTypes.email
        ? "email"
        : props.type == ContactDataTypes.website
        ? "website"
        : "connect"
)
</script>
