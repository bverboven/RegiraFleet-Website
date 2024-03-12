import type { IConfig } from "@/regira_modules/vue/entities"
import Entity from "../data/Entity"

const api = "/brands"

const config: IConfig = {
    id: Entity.name,
    key: "Brand",

    routePrefix: "brands",
    baseQueryParams: {
        includes: [],
    },
    initialQuery: {},

    overviewTitle: {
        en: "Brands",
        nl: "Merken",
    },
    detailsTitle: {
        en: "Brand",
        nl: "Merk",
    },
    description: {
        en: `Manage vehicle brands`,
        nl: `Beheer merken van voertuigen`,
    },
    icon: "bi bi-building-fill-gear",

    defaultPageSize: 10,

    api,
    detailsUrl: api,
    listUrl: api,
    searchUrl: api + "/search",
    saveUrl: api,
    deleteUrl: api,
}

export default config
