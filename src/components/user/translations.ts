import type { ITranslationMessage } from "@/regira_modules/vue/lang"

export default {
    changePassword: {
        en: "Change password",
        nl: "Wachtwoord aanpassen",
    },
    currentPassword: {
        en: "current password",
        nl: "huidig wachtwoord",
    },
    fillInUsernameMsg: {
        en: "Fill in username to request a password reset.",
        nl: "Vul je gebruikersnaam in om je wachtwoord opnieuw in te stellen",
    },
    forgotPassword: {
        en: "Forgot password?",
        nl: "Wachtwoord vergeten?",
    },
    newPassword: {
        en: "new password",
        nl: "nieuw wachtwoord",
    },
    password: {
        en: "Password",
        nl: "Wachtwoord",
    },
    passwordResetReceivedMsg: {
        en: "Password reset request received. Please check your email.",
        nl: "Je aanvraag is ontvangen, gelieve je e-mail te controleren.",
    },
    passwordResetSent: {
        en: "Reset request sent",
        nl: "Je aanvraag is verstuurd",
    },
    passwordResetFailed: {
        en: "Reset request failed",
        nl: "Je aanvraag is mislukt",
    },
    passwordsMustMatch: {
        en: "Passwords must match.",
        nl: "Wachtwoorden komen niet overeen",
    },
    repeatPassword: {
        en: "repeat password",
        nl: "herhaal wachtwoord",
    },
    signIn: {
        en: "Sign in",
        nl: "Aanmelden",
    },
    signOut: {
        en: "Sign out",
        nl: "Afmelden",
    },
    signingIn: {
        en: "Signing in ...",
        nl: "Aan het aanmelden ...",
    },
    signInErrorMsg: {
        en: "Unfortunately, signing in failed.",
        nl: "Helaas, het aanmelden is mislukt.",
    },
    tryAgainInMin: {
        en: "Try again in {minutes} min.",
        nl: "Probeer opnieuw in {minutes} min.",
    },
    username: {
        en: "Username",
        nl: "Gebruikersnaam",
    },
} as Record<string, ITranslationMessage>
