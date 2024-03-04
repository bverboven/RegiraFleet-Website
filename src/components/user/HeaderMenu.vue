<template>
    <ul class="navbar-nav me-auto mb-lg-0 px-2 p-md-0">
        <li v-if="!isAuthenticated">
            <Icon name="noUser" class="me-1" />
        </li>
        <li v-if="isAuthenticated" class="nav-item dropdown">
            <LoadingContainer :is-loading="isLoading" style="max-height: 2.5rem">
                <router-link :to="{ name: 'account' }" class="btn btn-link dropdown-item"><Icon name="user" /></router-link>
                <!-- <a class="nav-link dropdown-toggle" @click="handleToggleDropDown" href="#" id="navbarAccountDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                    <Icon name="user" /> USER
                </a> -->
            </LoadingContainer>
            <ul class="dropdown-menu dropdown-menu-start" :class="{ show: showAccountDropdown }" aria-labelledby="navbarAccountDropdown" v-click-outside="handleCloseMenu">
                <li class="nav-item dropdown">
                    <router-link :to="{ name: 'account' }" class="btn btn-link dropdown-item" @click.native="handleCloseMenu">My account</router-link>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li class="nav-item dropdown">
                    <button type="button" class="btn btn-link dropdown-item" @click="handleLogout">
                        <Icon name="exit" class="me-1" />
                        Sign out
                    </button>
                </li>
            </ul>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import { storeToRefs } from "pinia"
import { LoadingContainer } from "@/regira_modules/vue/ui"
import { useAuthStore } from "@/regira_modules/vue/auth"

const emit = defineEmits<{
    (e: "close"): void
}>()
const props = defineProps<{
    showDropdown?: boolean
    isAuthenticated?: boolean
}>()

const isLoading = ref(false)
const showAccountDropdown = ref(props.showDropdown)
watch(
    () => props.showDropdown,
    (newVal) => (showAccountDropdown.value = newVal)
)

const handleToggleDropDown = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
    showAccountDropdown.value = !showAccountDropdown.value
}

const authStore = useAuthStore()
const { authData } = storeToRefs(authStore)
function handleLogout() {
    handleCloseMenu()
    authStore.logout()
}
function handleCloseMenu() {
    if (showAccountDropdown.value) {
        showAccountDropdown.value = false
        emit("close")
    }
}
</script>
