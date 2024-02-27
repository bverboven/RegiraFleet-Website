import type { IConfig } from "@/regira_modules/vue/entities"
import Entity from "../data/Entity"

const api = "/countries"

const config: IConfig = {
    id: Entity.name,
    key: "Country",
    requires: ["Stakeholder"],

    routePrefix: "country",
    baseQueryParams: {
        //include: [],
    },
    nav: [],

    overviewTitle: "Countries",
    detailsTitle: "Country",
    description: `Manage countries`,
    icon: "bi bi-globe-americas",

    defaultPageSize: 10,

    api,
    detailsUrl: api,
    listUrl: api,
    searchUrl: api,
    saveUrl: api,
    deleteUrl: api,
}

export default config
