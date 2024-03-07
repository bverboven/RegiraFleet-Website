import { createApp } from "vue"
import { createPinia } from "pinia"
import type { RouteRecordRaw } from "vue-router"
import { routerFactory } from "./router"
import { Anchor, FormSection, DateInput, FormLabel, NullableCheckBox, iconPlugin, loadingPlugin, screenPlugin, modalPlugin, feedbackPlugin, NullableLabel } from "@/regira_modules/vue/ui"
import { focus, grow, clickOutside } from "@/regira_modules/vue/directives"
import { AppStatus, plugin as appPlugin, whenAppReady } from "@/regira_modules/vue/app"
import { plugin as isOnlinePlugin } from "@/regira_modules/vue/online"
import { plugin as debugPlugin } from "@/regira_modules/vue/debug"
import { preloaderPlugin, usePreloader } from "@/regira_modules/vue/entities"
import { initAxios } from "@/regira_modules/vue/http/axios"
import { plugin as authPlugin, CookieTokenManager } from "@/regira_modules/vue/auth"
import { plugin as servicesPlugin, type IServiceProvider } from "@/regira_modules/vue/ioc"
import appConfig, { createConfig, useConfig } from "@/app-config"
import entityPlugins from "./entities"

import App from "./App.vue"
import loadingImg from "@/assets/images/loading.gif"

// date serialization to JSON (without timezone)
import dateSerializer from "@/regira_modules/extensions/date-extensions"
dateSerializer.use()

// CSS
import "./assets/main.scss"
import { defaultPoolCache, PoolCache } from "@/regira_modules/vue/entities"
import { Entity as Country } from "./entities/countries"

fetch(`${appConfig.baseUrl}/config.json`)
    .then((r) => r.json())
    .then(async (config: Record<string, any>) => {
        console.debug("init", { config })
        // config
        const processedConfig = createConfig(config)
        const { api, includeCredentials } = processedConfig
        const axios = initAxios({ api, includeCredentials })

        document.title = processedConfig.title

        // app
        const app = createApp(App)
        // store
        app.use(createPinia())

        app.use(appPlugin, { culture: processedConfig.culture })

        // global components (use explicit naming -> functions are renamed when minimized in build)
        app.component("Anchor", Anchor)
        app.component("FormSection", FormSection)
        app.component("DateInput", DateInput)
        app.component("NullableCheckBox", NullableCheckBox)
        app.component("NullableLabel", NullableLabel)
        app.component("FormLabel", FormLabel)

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

        app.use(iconPlugin, { source: "bs", clearFirst: false })
        app.use(screenPlugin)
        app.use(isOnlinePlugin)
        app.use(debugPlugin, { isDebug: config.isDebug })
        app.use(loadingPlugin, { img: loadingImg })
        app.use(modalPlugin)
        app.use(feedbackPlugin, { autoHideDelay: 2500 })

        // global directives
        app.use(focus)
        app.use(grow)
        app.use(clickOutside)

        // entities + entity routes
        const entityRoutes: Array<RouteRecordRaw> = []
        app.use(entityPlugins, { routes: entityRoutes })

        // routing
        const router = routerFactory(entityRoutes)
        app.use(router)

        // preloader
        app.use(preloaderPlugin)

        // auth
        app.use(authPlugin, {
            enabled: true,
            clientApp: processedConfig.clientApp,
            tokenManager: new CookieTokenManager(),
            axios,
            onAuthenticationChange: async (auth) => {
                if (auth.isAuthenticated) {
                    app.config.globalProperties.$setAppStatus(AppStatus.Loading)
                    app.config.globalProperties.$feedback.success(`Welcome ${auth.displayName || auth.name}`)

                    // preloading
                    const preloaderTypes = [Country]
                    const { preload } = usePreloader()
                    await preload(preloaderTypes as any)

                    // ready
                    app.config.globalProperties.$setCulture(auth.culture)
                    app.config.globalProperties.$setAppStatus(AppStatus.Ready)
                    console.debug("ready", {
                        app,
                        appConfig: useConfig(),
                        router,
                        routes: router.getRoutes(),
                        cache: defaultPoolCache,
                        icons: app.config.globalProperties.$icons.map,
                    })
                } else {
                    app.config.globalProperties.$feedback.fail(`User logged out`)
                }
            },
        })

        // mount
        app.config.globalProperties.$setAppStatus(AppStatus.Mounting)
        app.mount("#app")

        await whenAppReady()
        // Welcome
        app.config.globalProperties.$feedback.success("Welcome, the app is ready")
    })
