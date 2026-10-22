<template>
    <form class="confirm-email" @submit.prevent="handleSubmit">
        <h4 class="mb-3">{{ $t("auth.confirmEmail") }}</h4>
        <p v-if="!token" class="text-danger">{{ $t("auth.confirmEmailNoToken") }}</p>
        <template v-else-if="isConfirmed">
            <p class="text-success">{{ $t("auth.emailConfirmed") }}</p>
            <RouterLink :to="{ name: 'home' }" class="btn btn-primary">{{ $t("auth.signIn") }}</RouterLink>
        </template>
        <template v-else>
            <p>{{ $t("auth.confirmEmailMsg") }}</p>
            <div class="row mb-3">
                <label for="confirm-password" class="col-sm-3 col-form-label">{{ $t("auth.newPassword") }}</label>
                <div class="col-sm-9">
                    <input id="confirm-password" name="new-password" type="password" class="form-control" autocomplete="new-password" v-model="password" />
                </div>
            </div>
            <div class="row mb-3">
                <label for="confirm-repeat-password" class="col-sm-3 col-form-label">{{ $t("auth.repeatPassword") }}</label>
                <div class="col-sm-9">
                    <input id="confirm-repeat-password" name="repeat-password" type="password" class="form-control" autocomplete="new-password" v-model="repeatPassword" />
                    <small v-if="!passwordsMatch" class="text-danger">{{ $t("auth.passwordsMustMatch") }}</small>
                </div>
            </div>
            <Feedback :feedback="feedback" />
            <button type="submit" class="btn btn-primary" :disabled="feedback.isPending || !passwordsMatch">{{ $t("auth.confirmEmail") }}</button>
        </template>
    </form>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import { useRoute } from "vue-router"
import { useAxios } from "regira_modules/vue/http"
import { Feedback, useFeedback, toFeedbackError } from "regira_modules/vue/ui"
import { useLang } from "regira_modules/vue/lang"

// The invitation mail links here with ?token=… (the confirmation token and the user name). Posting it confirms the
// address, and an account invited without a password gets the one chosen here; one that has a password keeps it.
const route = useRoute()
const token = computed(() => (route.query.token as string) ?? "")
const password = ref("")
const repeatPassword = ref("")
const passwordsMatch = computed(() => password.value === repeatPassword.value)
const isConfirmed = ref(false)

const { translate } = useLang()
const feedback = useFeedback()
async function handleSubmit() {
    feedback.pending(translate("auth.confirmEmail"))
    try {
        await useAxios().post("users/confirm-email", { token: token.value, password: password.value || undefined })
        isConfirmed.value = true
        feedback.reset()
    } catch (ex) {
        feedback.fail(translate("auth.confirmEmailFailed"), toFeedbackError(ex))
    }
}
</script>

<style scoped>
.confirm-email {
    max-width: 40rem;
}
</style>
