import type { IConfig } from "@/regira_modules/vue/entities"
import Entity from "../data/Entity"

const api = "/interventions"

const config: IConfig = {
    id: Entity.name,
    key: "Intervention",

    routePrefix: "Interventions",
    baseQueryParams: {
        includes: ["Vehicle", "Operator", "InterventionTypes"],
    },
    initialQuery: {},

    overviewTitle: "Interventions",
    detailsTitle: "Intervention",
    description: `Vehicle interventions`,
    icon: "bi bi-tools",

    defaultPageSize: 10,

    api,
    detailsUrl: api,
    listUrl: api,
    searchUrl: api + "/search",
    saveUrl: api,
    deleteUrl: api,
}

export default config
