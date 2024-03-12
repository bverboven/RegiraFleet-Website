import type { IConfig } from "@/regira_modules/vue/entities"
import Entity from "../data/Entity"

const api = "/intervention-types"

const config: IConfig = {
    id: Entity.name,
    key: "InterventionType",

    routePrefix: "intervention-types",
    baseQueryParams: {
        includes: [],
    },
    initialQuery: {},

    overviewTitle: {
        en: "Intervention Types",
        nl: "Interventietypes",
    },
    detailsTitle: {
        en: "Intervention Type",
        nl: "Interventietype",
    },
    description: {
        en: `Manage types of intervention`,
        nl: `Beheer interventietypes`,
    },
    icon: "bi bi-tools",

    defaultPageSize: 10,

    api,
    detailsUrl: api,
    listUrl: api,
    searchUrl: api,
    saveUrl: api,
    deleteUrl: api,
}

export default config
