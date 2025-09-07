<template>
    <ul class="navbar-nav me-auto mb-lg-0 px-2 p-md-0">
        <li v-if="!isAuthenticated">
            <Icon name="noUser" class="me-1" />
        </li>
        <li v-if="isAuthenticated" class="nav-item dropdown">
            <LoadingContainer :is-loading="isLoading" style="max-height: 2.5rem">
                <a class="nav-link dropdown-toggle" @click="handleToggleDropDown" href="#" id="navbarAccountDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                    <Icon name="user" />
                    <span class="ms-2 d-sm-none d-lg-inline">
                        {{ $auth.authData.displayName ?? $auth.authData.name }}
                    </span>
                </a>
            </LoadingContainer>
            <ul class="dropdown-menu dropdown-menu-start" :class="{ show: showAccountDropdown }" style="min-width: 8rem" aria-labelledby="navbarAccountDropdown" v-click-outside="handleCloseMenu">
                <li class="nav-item dropdown">
                    <router-link :to="{ name: 'account' }" class="btn btn-link dropdown-item" @click="handleCloseMenu">
                        <Icon name="tenant" class="me-1" />
                        {{ $t("auth.myAccount") }}
                    </router-link>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <template v-if="(tenants?.length || 0) > 1">
                    <li class="nav-item dropdown">
                        <button
                            type="button"
                            v-for="item in tenants"
                            :key="item.id"
                            class="btn btn-link dropdown-item px-2"
                            @click="
                                () => {
                                    tenantStore.setActiveTenant(item.id)
                                    handleCloseMenu()
                                }
                            "
                        >
                            <span class="badge text-bg-success rounded-pill cursor pointer px-1 mx-1" :class="item.id == activeTenant?.id ? 'opacity-100' : 'opacity-25'">
                                <Icon name="check" />
                            </span>
                            {{ item.title }}
                        </button>
                    </li>
                    <li><hr class="dropdown-divider" /></li>
                </template>
                <template v-if="$isAdmin">
                    <li class="nav-item dropdown">
                        <router-link :to="{ name: 'admin' }" class="btn btn-link dropdown-item" @click="handleCloseMenu">
                            <Icon name="people" class="me-1" />
                            {{ $t("manageTenantUsers") }}
                        </router-link>
                    </li>
                    <li><hr class="dropdown-divider" /></li>
                </template>
                <li class="nav-item dropdown">
                    <button type="button" class="btn btn-link dropdown-item" @click="handleLogout">
                        <Icon name="exit" class="me-1" />
                        {{ $t("signOut") }}
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
import { useEntityStore as useTenantStore } from "@/entities/tenants"

const emit = defineEmits<{
    (e: "close"): void
}>()
const props = defineProps<{
    showDropdown?: boolean
    isAuthenticated?: boolean
}>()

const isLoading = ref(false)

const authStore = useAuthStore()
function handleLogout() {
    handleCloseMenu()
    authStore.logout()
}

const tenantStore = useTenantStore()
const { items: tenants, activeTenant } = storeToRefs(tenantStore)

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
function handleCloseMenu() {
    if (showAccountDropdown.value) {
        showAccountDropdown.value = false
        emit("close")
    }
}
</script>
