import type { IConfig } from "@/regira_modules/vue/entities"
import Entity from "../data/Entity"

const api = "/vehicle-types"

const config: IConfig = {
    id: Entity.name,
    key: "VehicleType",

    routePrefix: "vehicle-types",
    baseQueryParams: {
        includes: [],
    },
    initialQuery: {},

    overviewTitle: {
        en: "Vehicle Types",
        nl: "Voertuigtypes",
    },
    detailsTitle: {
        en: "Vehicle Type",
        nl: "Voertuigtype",
    },
    description: {
        en: `Manage types of vehicle`,
        nl: `Beheer voertuigtypes`,
    },
    icon: "bi bi-sign-intersection-t",

    defaultPageSize: 10,

    api,
    detailsUrl: api,
    listUrl: api,
    searchUrl: api,
    saveUrl: api,
    deleteUrl: api,
}

export default config
