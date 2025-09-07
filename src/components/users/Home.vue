<template>
    <section>
        <div class="row">
            <div class="col-auto">
                <ul class="list-group">
                    <li class="list-group-item">
                        <Icon name="user" class="mx-1 me-2" />
                        {{ $auth.authData.displayName ?? $auth.authData.name }}
                    </li>
                    <li class="list-group-item">
                        <button type="button" class="btn btn-default p-1" @click="showChangePassword = !showChangePassword">
                            <Icon name="security" class="me-1" />
                            {{ $t("auth.changePassword") }}
                        </button>
                    </li>
                    <li class="list-group-item">
                        <button type="button" class="btn btn-default p-1" @click="showChangePersonalData = !showChangePersonalData">
                            <Icon name="contact" class="me-1" />
                            {{ $t("auth.personalData") }}
                        </button>
                    </li>
                    <li v-if="$isAdmin" class="list-group-item">
                        <router-link :to="{ name: 'admin' }" class="btn btn-default p-1">
                            <Icon name="people" class="me-1" />
                            {{ $t("manageTenantUsers") }}
                        </router-link>
                    </li>
                    <li class="list-group-item">
                        <button type="button" class="btn btn-default p-1" @click="handleLogout">
                            <Icon name="exit" class="me-1" />
                            {{ $t("auth.signOut") }}
                        </button>
                    </li>
                </ul>
            </div>
            <div class="col-auto" v-show="(tenantSelectorEl?.tenantCount ?? 0) > 1">
                <TenantSelector ref="tenantSelectorEl" />
            </div>
        </div>
    </section>

    <Teleport to="#modals">
        <MyModal :is-visible="showChangePassword" :title="$t('auth.changePassword')" :show-footer="false" @close="showChangePassword = false" @cancel="showChangePassword = false">
            <ChangePasswordForm :username="$auth.authData.name" />
        </MyModal>
        <MyModal :is-visible="showChangePersonalData" :title="$t('auth.changePassword')" :show-footer="false" @close="showChangePersonalData = false" @cancel="showChangePersonalData = false">
            <ChangePersonalData />
        </MyModal>
    </Teleport>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useAuthStore } from "@/regira_modules/vue/auth"
import ChangePasswordForm from "./ChangePasswordForm.vue"
import ChangePersonalData from "./ChangePersonalData.vue"
import { TenantSelector } from "@/entities/tenants"

const showChangePassword = ref(false)
const showChangePersonalData = ref(false)

const authStore = useAuthStore()
const handleLogout = () => {
    authStore.logout()
}

const tenantSelectorEl = ref<any>(null)
</script>
