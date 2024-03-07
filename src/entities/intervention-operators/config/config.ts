import type { IConfig } from "@/regira_modules/vue/entities"
import Entity from "../data/Entity"

const api = "/intervention-operators"

const config: IConfig = {
    id: Entity.name,
    key: "InterventionOperator",

    routePrefix: "intervention-operators",
    baseQueryParams: {
        includes: [],
    },
    initialQuery: {},

    overviewTitle: "Suppliers",
    detailsTitle: "Supplier",
    description: `Manage suppliers & intervention operators`,
    icon: "bi bi-person-gear",

    defaultPageSize: 10,

    api,
    detailsUrl: api,
    listUrl: api,
    searchUrl: api + "/search",
    saveUrl: api,
    deleteUrl: api,
}

export default config
