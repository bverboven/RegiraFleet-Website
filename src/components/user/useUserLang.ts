import { computed } from "vue"
import { useLang, translate, type IFormatInput } from "@/regira_modules/vue/lang"
import messages from "./messages"

export function useUserLang() {
    const lang = useLang()
    const { langCode, fallbackLangCode } = lang
    const t = computed(() => (key: string, formatArgs?: IFormatInput) => translate(key, messages, langCode.value, formatArgs) ?? translate(key, messages, fallbackLangCode.value, formatArgs))
    const tm = (key: string, formatArgs?: IFormatInput) => translate(key, messages, langCode.value, formatArgs) ?? translate(key, messages, fallbackLangCode.value, formatArgs)

    return {
        ...lang,
        t,
        tm,
    }
}

export default useUserLang
