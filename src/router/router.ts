import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"
import defaultRoutes from "./routes"
//import { useConfig } from "@/app-config"

//const { baseUrl } = useConfig()

function routerFactory(routes: Array<RouteRecordRaw>) {
    const router = createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes: [...defaultRoutes, ...routes],
    })

    // toDo: find better fix!
    // router.beforeEach((to, from) => {
    //     const routes = router.getRoutes()
    //     if (to.name === "notFound") {
    //         const path = location.pathname.substring(baseUrl.length)
    //         const wantedRoute = routes.find((r) => r.path == path)
    //         if (wantedRoute != null) {
    //             console.warn("route not found?", path, { to, from, router, wantedRoute, routes })
    //             router.push(wantedRoute)
    //         }
    //         return false
    //     }
    //     return true
    // })

    return router
}

export default routerFactory
