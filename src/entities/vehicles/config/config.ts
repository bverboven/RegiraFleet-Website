import type { IConfig } from "@/regira_modules/vue/entities"
import Entity from "../data/Entity"

const api = "/vehicles"

const config: IConfig = {
    id: Entity.name,
    key: "Vehicle",

    routePrefix: "vehicles",
    baseQueryParams: {
        includes: ["Brand", "VehicleType"],
    },

    overviewTitle: {
        en: "Vehicles",
        nl: "Voertuigen",
    },
    detailsTitle: {
        en: "Vehicle",
        nl: "Voertuig",
    },
    description: {
        en: `Manage Vehicles`,
        nl: `Beheer voertuigen`,
    },
    icon: "bi bi-car-front",

    defaultPageSize: 10,

    api,
    detailsUrl: api,
    listUrl: api,
    searchUrl: api + "/search",
    saveUrl: api,
    deleteUrl: api,
}

export default config
