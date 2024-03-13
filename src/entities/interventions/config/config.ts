import type { IConfig } from "@/regira_modules/vue/entities"
import Entity from "../data/Entity"

const api = "/interventions"

const config: IConfig = {
    id: Entity.name,
    key: "Intervention",

    routePrefix: "interventions",
    baseQueryParams: {
        includes: ["Vehicle", "Operator", "InterventionType", "Invoice"],
    },
    initialQuery: {},

    overviewTitle: "interventions",
    detailsTitle: "intervention",
    description: "interventionsDescription",
    icon: "bi bi-wrench-adjustable",

    defaultPageSize: 10,

    api,
    detailsUrl: api,
    listUrl: api,
    searchUrl: api + "/search",
    saveUrl: api,
    deleteUrl: api,
}

export default config
