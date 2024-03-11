<template>
    <form @submit.prevent="handleSubmit" ref="loginForm" :style="{ 'min-height': minHeight }">
        <div class="mb-3 position-relative" v-if="failed">
            <div class="bg-danger border rounded text-light p-2">
                {{ $t("signInErrorMsg") }}
                <span v-if="isLockedOut">{{ $t("tryAgainInMin", { minutes: 5 }) }}</span>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col">
                <div class="float-end">
                    <ul class="list-inline">
                        <li class="list-inline-item" :class="{ 'fw-bold': langCode == 'en' }" @click="setLangCode('en')">EN</li>
                        <li class="list-inline-item" :class="{ 'fw-bold': langCode == 'fr' }" @click="setLangCode('fr')">FR</li>
                        <li class="list-inline-item" :class="{ 'fw-bold': langCode == 'nl' }" @click="setLangCode('nl')">NL</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <label class="col-sm-3 col-form-label">{{ $t("username") }}</label>
            <div class="col-sm-9">
                <div class="input-group">
                    <input class="form-control" autocomplete="username email" v-model="username" :disabled="signingIn" />
                    <template v-if="appConfig.isDemo">
                        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" @click="showUsersList = !showUsersList">
                            Select user
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end" :class="{ show: showUsersList }" style="min-width: 12.5rem">
                            <li v-for="item in demoUsers" :key="item.username">
                                <a class="dropdown-item" href="#" @click="handleSelectUser(item)">{{ item.title }}</a>
                            </li>
                        </ul>
                    </template>
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <label class="col-sm-3 col-form-label">{{ $t("password") }}</label>
            <div class="col-sm-9">
                <input type="password" class="form-control" autocomplete="password current-password" v-model="password" :disabled="signingIn" />
            </div>
        </div>
        <div class="row">
            <div class="col-4 col-sm-3">
                <button type="submit" class="btn btn-primary" :disabled="signingIn">{{ $t("signIn") }}</button>
            </div>
            <div class="col col-sm">
                <span v-if="signingIn" class="text-info">
                    <Loading class="me-1" style="width: 2rem" />
                    {{ $t("signingIn") }}
                </span>
                <button v-else type="button" class="btn btn-link" @click="handleForgotPassword">{{ $t("forgotPassword") }}</button>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { useConfig } from "@/app-config"
import { useLoginForm, type ILoginEmits, type ILoginProps, useAuth } from "@/regira_modules/vue/auth"
import { Loading } from "@/regira_modules/vue/ui"
import { useLang } from "@/regira_modules/vue/lang"

interface IEmits extends ILoginEmits {}
const emit = defineEmits<IEmits>()

const props: ILoginProps = defineProps<{
    username?: string
    signingIn?: boolean
}>()

type IDemoUser = { username: string; title: string; clientId: string }

const { username, password, signingIn, failed, isLockedOut, handleSubmit, handleForgotPassword } = useLoginForm(props, emit)

const appConfig = useConfig()
const minHeight = computed(() => (appConfig.isDemo && showUsersList.value ? "22rem" : "10rem"))
const showUsersList = ref(false)
const demoUsers = ref<Array<IDemoUser>>()

const auth = useAuth()
function handleSelectUser(item: { username: string; password?: string; clientId: string }) {
    username.value = item.username
    password.value = item.password || "demo"
    showUsersList.value = false
    console.debug("handleSelectUser", { item, options: auth.service.options })
    auth.service.options.loginUrl = appConfig.loginUrl.replace("{clientId}", item.clientId).replace("{clientApp}", appConfig.clientApp)
}

const { langCode, setLangCode } = useLang()

onMounted(async () => {
    demoUsers.value = await fetch(`${appConfig.baseUrl}/data/demo-users.json`).then((r) => r.json())
})
</script>
