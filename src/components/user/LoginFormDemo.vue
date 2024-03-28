<template>
    <form @submit.prevent="handleSubmit" ref="loginForm" :style="{ 'min-height': minHeight }">
        <!-- <p class="text-info">{{ $t("auth.demoInfoMessage") }}</p> -->
        <div class="mb-3 position-relative" v-if="failed">
            <div class="bg-danger border rounded text-light p-2">
                {{ $t("auth.signInErrorMsg") }}
                <span v-if="isLockedOut">{{ $t("auth.tryAgainInMin", { minutes: 5 }) }}</span>
            </div>
        </div>
        <!-- <div class="row mb-3">
            <label class="col-sm-3 col-form-label">{{ $t("auth.client") }}</label>
            <div class="col-sm-9">
                <select v-model="clientId" class="form-select">
                    <option v-for="client in clients" :key="client.id" :value="client.id">{{ client.title }}</option>
                </select>
            </div>
        </div> -->
        <div class="row mb-3">
            <label class="col-sm-3 col-form-label">{{ $t("auth.username") }}</label>
            <div class="col-sm-9">
                <div class="input-group">
                    <input class="form-control" autocomplete="username email" v-model="username" :disabled="signingIn" />
                    <template v-if="demoUsers?.length">
                        <!-- <select v-model="user" class="form-select" @change="handleSelectUser(user!)">
                            <option v-for="item in demoUsers" :key="item.username" :value="item">{{ item.username }}</option>
                        </select> -->
                        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" @click="showUsersList = !showUsersList">
                            Select user
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end" :class="{ show: showUsersList }" style="min-width: 12.5rem">
                            <li v-for="item in clientUsers" :key="item.username">
                                <a class="dropdown-item" href="#" @click="handleSelectUser(item)">{{ item.title }}</a>
                            </li>
                        </ul>
                    </template>
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <label class="col-sm-3 col-form-label">{{ $t("auth.password") }}</label>
            <div class="col-sm-9">
                <input type="password" class="form-control" autocomplete="password current-password" v-model="password" :disabled="signingIn" />
            </div>
        </div>
        <div class="row">
            <div class="col">
                <button type="submit" class="btn btn-primary" :disabled="signingIn">{{ $t("auth.signIn") }}</button>
            </div>
            <div class="col-auto">
                <span v-if="signingIn" class="text-info">
                    <Loading class="me-1" style="width: 2rem" />
                    {{ $t("auth.signingIn") }}
                </span>
                <button v-else type="button" class="btn btn-link" @click="handleForgotPassword">{{ $t("auth.forgotPassword") }}</button>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue"
import { useLoginForm, type ILoginEmits, type ILoginProps, useAuth } from "@/regira_modules/vue/auth"
import { Loading } from "@/regira_modules/vue/ui"
import { useAxios } from "@/regira_modules/vue/http"
import { useConfig } from "@/app-config"
import { type Entity as Client } from "@/entities/clients"

interface IEmits extends ILoginEmits {}
const emit = defineEmits<IEmits>()

const props: ILoginProps = defineProps<{
    username?: string
    signingIn?: boolean
}>()

type IDemoUser = { username: string; title: string; clientId: string }

const { username, password, signingIn, failed, isLockedOut, handleSubmit, handleForgotPassword } = useLoginForm(props, emit)

const appConfig = useConfig()
const showUsersList = ref(false)
const clientId = ref<string>()
const clients = ref<Array<Client>>()
const demoUsers = ref<Array<IDemoUser>>()
const minHeight = computed(() => (showUsersList.value ? "20rem" : "10rem"))
const clientUsers = computed<Array<IDemoUser>>(() => demoUsers.value?.filter((x) => !clientId.value || x.clientId == clientId.value) || [])

// auth
const auth = useAuth()
function handleSelectUser(item: { username: string; password?: string; clientId: string }) {
    username.value = item.username
    password.value = item.password || "demo"
    showUsersList.value = false
}

onMounted(async () => {
    const axios = useAxios()
    clients.value = await axios.get(`demo-clients`).then((r) => r.data)
    demoUsers.value = await fetch(`${appConfig.baseUrl}/data/demo-users.json`).then((r) => r.json())
})
watch(clientId, () => {
    auth.service.options.loginUrl = appConfig.loginUrl
        .replace("{clientId}", "")
        //.replace("{clientId}", clientId.value)
        .replace("{clientApp}", appConfig.clientApp)
})
</script>
