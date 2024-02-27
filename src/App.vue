<template>
  <div class="page">
    <Offline />

    <header class="mb-2 fixed-top">
      <Header />
    </header>

    <Debug />

    <main class="container-fluid">
      <LoadingContainer
        :isLoading="$appStatus != AppStatus.Ready && (!$auth.enabled || $auth.isAuthenticated)"
      >
        <main class="flex-shrink-0 mb-2" :style="{ 'padding-top': isOnline ? '4.5rem' : '7rem' }">
          <div :class="{ 'container-md': !fullWidth, 'container-fluid': fullWidth }">
            <router-view></router-view>
          </div>
        </main>
      </LoadingContainer>
    </main>

    <footer class="footer mt-auto py-3 bg-light">
      <Footer />
    </footer>

    <Teleport to="#loginModal">
      <LoginModal v-if="showLogin">
        <LoginForm :username="username" @forgot-password="openForgotPassword" />
      </LoginModal>
      <ForgotPasswordModal v-if="showForgotPassword" @close="showForgotPassword = false">
        <ForgotPassword :username="username" @login="openLogin" />
      </ForgotPasswordModal>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { LoadingContainer } from '@/regira_modules/vue/ui'
import { LoginModal, ForgotPasswordModal, useAuthStore } from '@/regira_modules/vue/auth'
import { AppStatus } from '@/regira_modules/vue/app'
import Header from '@/components/layout/TheHeader.vue'
import Footer from '@/components/layout/TheFooter.vue'
import Offline from '@/components/layout/Offline.vue'
import Debug from '@/components/layout/Debug.vue'
import LoginForm from '@/components/user/LoginForm.vue'
import ForgotPassword from '@/components/user/ForgotPassword.vue'

const router = useRouter()
const fullWidth = computed(
  () => router.currentRoute.value.meta && router.currentRoute.value.meta.fullWidth
)

// const authStore = useAuthStore()
// const { enabled, isAuthenticated } = storeToRefs(authStore)
// console.debug("App", { authStore, cmp: getCurrentInstance() })
const showForgotPassword = ref(false)
const username = ref<string>()
function openForgotPassword(e?: string) {
  console.debug('openForgotPassword', { evt: e })
  showForgotPassword.value = true
  username.value = e || ''
}
const authStore = useAuthStore()
const showLogin = computed(() => {
  console.debug('showLogin', {
    isRequired: authStore.isRequired,
    isAuthenticated: authStore.isAuthenticated
  })
  return authStore.isRequired && !authStore.isAuthenticated
})
function openLogin(login?: string) {
  showForgotPassword.value = false
  username.value = login
}
</script>
