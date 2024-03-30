<template>
    <UserInput @save="load" />

    <div v-for="item in items" :key="item.id!" class="row">
        <div class="col mb-2">
            <div class="input-group">
                <div class="input-group-text"><Icon name="user" /></div>
                <div class="form-control">
                    {{ item.email }}
                </div>
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
                <button type="submit" class="btn btn-outline-success py-1"><Icon name="save" /></button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useAxios } from "@/regira_modules/vue/http"
import type ClientUser from "./Entity"
import UserInput from "./UserInput.vue"
import { useAuthStore } from "@/regira_modules/vue/auth"

const axios = useAxios()

const items = ref<Array<ClientUser>>()

// trigger searchHandler when logging in or refreshing token
const authStore = useAuthStore()
authStore.$onAction(({ name, after }) => ["login", "refresh"].includes(name) && after(() => authStore.isAuthenticated && load()))

async function load() {
    const response = await axios.get("/users")
    items.value = response.data
}
onMounted(load)
</script>
