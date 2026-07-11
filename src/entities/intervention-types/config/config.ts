import type { IConfig } from "regira_modules/vue/entities"
import Entity from "../data/Entity"

const api = "/intervention-types"

const config: IConfig = {
    id: Entity.name,
    key: "InterventionType",
    requires: [],
    isComplex: true,

    routePrefix: "intervention-types",
    baseQueryParams: {
        includes: [],
    },
    initialQuery: {},

    overviewTitle: "interventionTypes",
    detailsTitle: "interventionType",
    description: "interventionTypesDescription",
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
