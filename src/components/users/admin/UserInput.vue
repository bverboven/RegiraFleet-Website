<template>
    <form @submit.prevent="handleSubmit">
        <LoadingContainer :is-loading="isLoading">
            <div class="row">
                <div class="col mb-2">
                    <div class="input-group">
                        <div class="input-group-text opacity-50"><Icon name="user" /></div>
                        <input type="email" v-model="item.email" class="form-control" placeholder="email / username" />
                        <div class="input-group-text">
                            <label class="form-check-label mx-1">
                                <input type="checkbox" v-model="item.permissions" value="can_read" class="form-check-input" />
                                Read
                            </label>
                            <label class="form-check-label mx-1">
                                <input type="checkbox" v-model="item.permissions" value="can_write" class="form-check-input" />
                                Write
                            </label>
                        </div>
                        <button type="submit" class="btn btn-outline-success py-1"><Icon name="new" /></button>
                    </div>
                </div>
            </div>
        </LoadingContainer>
    </form>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { LoadingContainer } from "@/regira_modules/vue/ui"
import { useConfig } from "@/app-config"
import Entity from "./Entity"
import { saveUser } from "./functions"

const emit = defineEmits<{
    (e: "save", arg: { saved: Entity; isNew: boolean }): void
}>()

const config = useConfig()
const router = useRouter()

const item = ref<Entity>(new Entity())

const confirmEmailRoute = router.resolve({ name: "confirmEmail" })
const siteUrl = `${location.protocol}//${location.host}${config.baseUrl}${confirmEmailRoute.fullPath}`

const isLoading = ref(false)
async function handleSubmit() {
    isLoading.value = true
    try {
        const isNew = !item.value?.id
        await saveUser(item.value, siteUrl)
        emit("save", { saved: item.value, isNew })
        console.debug("save user", { item: item.value, siteUrl })
        item.value = new Entity()
    } finally {
        isLoading.value = false
    }
}
</script>
