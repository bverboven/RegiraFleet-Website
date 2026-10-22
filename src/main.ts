import { createApp } from "vue"
import { createPinia } from "pinia"
import type { RouteRecordRaw } from "vue-router"
import { initAxios } from "regira_modules/vue/http"
import { plugin as servicesPlugin, configureGlobals, type IServiceProvider } from "regira_modules/vue/ioc"
import { AppStatus, plugin as appPlugin, whenAppReady } from "regira_modules/vue/app"
import { plugin as langPlugin, useLang } from "regira_modules/vue/lang"
import {
    iconPlugin,
    loadingPlugin,
    screenPlugin,
    feedbackPlugin,
    pagingPlugin,
    modalPlugin,
    Anchor,
    FormSection,
    FormLabel,
    DateInput,
    NullableCheckBox,
    NullableLabel,
} from "regira_modules/vue/ui"
import { focus, grow, clickOutside } from "regira_modules/vue/directives"
import { plugin as isOnlinePlugin } from "regira_modules/vue/online"
import { plugin as debugPlugin } from "regira_modules/vue/debug"
import { preloaderPlugin, usePreloader, defaultPoolCache, PoolCache } from "regira_modules/vue/entities"
import { plugin as authPlugin, LocalStorageTokenManager, onAuthenticated } from "regira_modules/vue/auth"
import { formatDateTime } from "regira_modules/vue/formatters"
import appConfig, { createConfig, useConfig } from "@/app-config"
import { routerFactory } from "@/router"
import { plugin as userPlugin } from "@/infrastructure/user-plugin"
import { shownAccount } from "@/infrastructure/account"
import { plugin as statisticsPlugin } from "@/statistics"
import { default as entityPlugins, tenantPlugin } from "@/entities"

import { Entity as Country } from "@/entities/countries"
import { Entity as VehicleType } from "@/entities/vehicle-types"

import App from "@/App.vue"
import DescriptionInput from "@/components/input/DescriptionInput.vue"
import FleetModal from "@/components/layout/FleetModal.vue"

// opt in to app-wide component registration (Icon, IconButton, Loading*, Paging, MyModal, Debug)
// — must be set before the plugins install
configureGlobals({ registerComponentsGlobally: true })

// Assets — Bootstrap 5 + icons via npm, library component styles (modal backdrop, autocomplete dropdown)
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "regira_modules/style.css"
import "./assets/theme.scss" // app theme — overrides library --rg-* tokens; must come after style.css
import "./assets/base.scss"
import "./assets/main.scss"
import loadingImg from "@/assets/images/loading.gif"

// load config
fetch(`${appConfig.baseUrl}/config.json?v=${formatDateTime(new Date(), "yyyyMMdd")}`)
    .then((r) => r.json())
    .then(async (config: Record<string, any>) => {
        // start init app
        console.debug("init", { config })
        // config (processed)
        const processedConfig = createConfig(config)
        const { api, includeCredentials } = processedConfig
        const axios = initAxios({ api, includeCredentials })

        // load translations
        const translations = await fetch(`${appConfig.baseUrl}/data/translations.json?v=${formatDateTime(new Date(), "yyyyMMdd")}`).then((r) => r.json())

        // app
        const app = createApp(App)
        // store
        app.use(createPinia())

        app.use(appPlugin, { culture: processedConfig.culture })

        // services
        app.use(servicesPlugin, {
            configure: (sp: IServiceProvider) => {
                return (
                    sp
                        // axios
                        .add("axios", () => axios)
                        // pooling
                        .add(PoolCache.name, () => defaultPoolCache)
                )
            },
        })

        // UI plugins (registerComponentsGlobally is on — plugins register their components app-wide)
        app.use(iconPlugin, { source: "bs", clearFirst: false })
        app.use(screenPlugin)
        app.use(isOnlinePlugin)
        app.use(loadingPlugin, { img: loadingImg })
        app.use(pagingPlugin)
        app.use(modalPlugin, { Modal: FleetModal })
        app.use(feedbackPlugin, { autoHideDelay: 2500 })

        // global components not covered by the plugins (use explicit naming -> functions are renamed when minimized in build)
        app.component("MyAnchor", Anchor)
        app.component("FormSection", FormSection)
        app.component("FormLabel", FormLabel)
        app.component("DateInput", DateInput)
        app.component("NullableCheckBox", NullableCheckBox)
        app.component("NullableLabel", NullableLabel)
        app.component("DescriptionInput", DescriptionInput)

        // lang
        app.use(langPlugin, {
            defaultLang: "en",
            messages: translations,
        })
        const { translate: t, translateMessage, setLangCode } = useLang()

        document.title = translateMessage(processedConfig.title)

        // global directives
        app.use(focus)
        app.use(grow)
        app.use(clickOutside)

        // entities + entity routes
        const entityRoutes: Array<RouteRecordRaw> = []
        app.use(entityPlugins, { routes: entityRoutes })

        // statistics + routes
        const statisticRoutes: Array<RouteRecordRaw> = []
        app.use(statisticsPlugin, { routes: statisticRoutes })

        // routing
        const router = routerFactory([...entityRoutes, ...statisticRoutes])
        app.use(router)

        // preloader
        app.use(preloaderPlugin)

        // tenants
        app.use(tenantPlugin)

        // debug (needs the router; shows only when ?debug=1 / isDebug)
        app.use(debugPlugin, { isDebug: config.isDebug })

        // The pool holds the active tenant's rows (vehicle types, countries, ...) for this tab: another account, or a tenant
        // switch, drops them and preloads the new tenant's, or the pickers keep offering the previous tenant's rows
        let pooledAccount: string | undefined // the user and tenant whose rows the pool holds
        let pooling: Promise<unknown> = Promise.resolve()
        function poolFor(account: string | undefined) {
            if (account !== pooledAccount) {
                defaultPoolCache.clear()
                pooledAccount = account
                pooling = account ? usePreloader().preload([Country, VehicleType] as any) : Promise.resolve()
            }
            return pooling
        }

        // auth last (needs the router on the app)
        app.use(authPlugin, {
            enabled: true,
            clientApp: processedConfig.clientApp,
            loginUrl: processedConfig.loginUrl.replace(/{clientApp}/, processedConfig.clientApp).replace(/{tenantId}/, localStorage.getItem("tenant") || ""),
            tokenManager: new LocalStorageTokenManager(),
            axios,
            onAuthenticationChange: async (auth) => {
                if (auth.isAuthenticated) {
                    app.config.globalProperties.$setAppStatus(AppStatus.Loading)
                    const welcomeMsg = t("welcome", { name: auth.displayName || auth.name })
                    app.config.globalProperties.$feedback.success(welcomeMsg)

                    // preloading
                    await poolFor(shownAccount(auth))

                    // ready
                    const culture = Array.isArray(auth.culture) ? (auth.culture[0] as string) : auth.culture
                    if (culture) {
                        app.config.globalProperties.$setCulture(culture)
                    }
                    app.config.globalProperties.$setAppStatus(AppStatus.Ready)

                    setLangCode(culture?.split("-")[0] || "en")

                    document.title = translateMessage(processedConfig.title)

                    console.debug("ready", {
                        app,
                        appConfig: useConfig(),
                        router,
                        routes: router.getRoutes(),
                        cache: defaultPoolCache,
                        icons: (app.config.globalProperties.$icons as any).map,
                    })
                } else {
                    poolFor(undefined) // the next account must not see the previous one's rows
                    app.config.globalProperties.$feedback.fail(`User logged out`)
                }
            },
        })
        // onAuthenticationChange only hears signing in and out; a tenant switch refreshes the token, which this hears
        onAuthenticated(() => poolFor(shownAccount()), { immediate: false })
        app.use(userPlugin)

        // mount
        app.config.globalProperties.$setAppStatus(AppStatus.Mounting)

        app.mount("#app")

        await whenAppReady()
    })
