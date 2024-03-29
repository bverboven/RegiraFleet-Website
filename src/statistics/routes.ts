import Permissions from "@/infrastructure/permissions"

import StatisticsView from "@/views/StatisticsView.vue"
import StatsPerVehicle from "./components/DefaultStats.vue"
import StatsPerVehicleType from "./components/DefaultStats.vue"
import StatsPerVehiclePerType from "./components/StatsWithVehicleType.vue"
import StatsPerSupplier from "./components/DefaultStats.vue"
import StatsPerInterventionType from "./components/DefaultStats.vue"
import StatsPerInterventionTypePerVehicleType from "./components/DefaultStats.vue"
import YearVehicleTypeFilter from "./components/YearVehicleTypeFilter.vue"

export default [
    // statistics
    {
        name: "statistics",
        path: "/statistics",
        component: StatisticsView,
        props: true,
        meta: {
            permissions: [Permissions.CAN_READ],
            fullWidth: true,
        },
        children: [
            {
                name: "stats-per-vehicle",
                path: "per-vehicle",
                component: StatsPerVehicle,
                meta: {
                    title: {
                        en: "Totals per vehicle",
                        nl: "Totalen per voertuig",
                    },
                    api: "per-vehicle/{year}",
                },
            },
            {
                name: "stats-per-vehicleType",
                path: "per-vehicletype",
                component: StatsPerVehicleType,
                meta: {
                    title: {
                        en: "Totals per vehicletype",
                        nl: "Totalen per voertuigtype",
                    },
                    api: "per-vehicletype/{year}",
                },
            },
            {
                name: "stats-per-supplier",
                path: "per-supplier",
                component: StatsPerSupplier,
                meta: {
                    title: {
                        en: "Totals per supplier",
                        nl: "Totalen per leverancier",
                    },
                    api: "per-intervention-operator/{year}",
                },
            },
            {
                name: "stats-per-interventionType",
                path: "per-interventiontype",
                component: StatsPerInterventionType,
                meta: {
                    title: {
                        en: "Totals per interventiontype",
                        nl: "Totalen per interventietype",
                    },
                    api: "per-interventiontype/{year}",
                },
            },
            {
                name: "stats-per-vehicle-per-type",
                path: "per-vehicle-per-type",
                component: StatsPerVehiclePerType,
                meta: {
                    title: {
                        en: "Totals per vehicle per type",
                        nl: "Totalen per voertuig per type",
                    },
                    api: "per-vehicle/{vehicleTypeId}/{year}",
                },
            },
            {
                name: "stats-per-interventionType-and-vehicleType",
                path: "per-interventiontype-en-vehicletype",
                component: StatsPerInterventionTypePerVehicleType,
                meta: {
                    title: {
                        en: "Totals per interventiontype & vehicletype",
                        nl: "Totalen per interventietype & voertuigtype",
                    },
                    api: "per-interventiontype-and-vehicletype/{year}",
                },
            },
        ],
    },
]
