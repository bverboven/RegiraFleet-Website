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

    overviewTitle: "vehicles",
    detailsTitle: "vehicle",
    description: "vehiclesDescription",
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
