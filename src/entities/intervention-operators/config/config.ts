import type { IConfig } from "@/regira_modules/vue/entities"
import Entity from "../data/Entity"

const api = "/intervention-operators"

const config: IConfig = {
    id: Entity.name,
    key: "InterventionOperator",

    routePrefix: "intervention-operators",
    baseQueryParams: {
        includes: ["Addresses", "ContactData"],
    },
    initialQuery: {},

    overviewTitle: {
        en: "Suppliers",
        nl: "Leveranciers",
    },
    detailsTitle: {
        en: "Supplier",
        nl: "Leverancier",
    },
    description: {
        en: `Manage suppliers & service operators`,
        nl: `Beheer garages & leveranciers`,
    },
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
