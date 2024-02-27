<template>
    <section>
        <router-view></router-view>

        <Debug
            :modelValue="{
                userId: $auth.authData.sub,
                username: $auth.authData.name,
                permissions,
                auth: $auth,
            }"
        />
    </section>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/regira_modules/vue/auth"
import { storeToRefs } from "pinia"

const { permissions } = storeToRefs(useAuthStore())
</script>
