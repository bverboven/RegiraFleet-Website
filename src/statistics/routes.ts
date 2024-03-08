import Permissions from "@/infrastructure/permissions"

import StatisticsView from "@/views/StatisticsView.vue"
import StatsPerVehicle from "./components/DefaultStats.vue"
import StatsPerVehicleType from "./components/DefaultStats.vue"
import StatsPerVehiclePerType from "@/views/Dummy.vue"
import StatsPerSupplier from "./components/DefaultStats.vue"
import StatsPerInterventionType from "./components/DefaultStats.vue"
import StatsPerInterventionTypePerVehicleType from "./components/DefaultStats.vue"

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
                    title: "Totals per vehicle",
                    api: "per-vehicle/{year}",
                },
            },
            {
                name: "stats-per-vehicleType",
                path: "per-vehicletype",
                component: StatsPerVehicleType,
                meta: {
                    title: "Totals per vehicletype",
                    api: "per-vehicletype/{year}",
                },
            },
            {
                name: "stats-per-supplier",
                path: "per-supplier",
                component: StatsPerSupplier,
                meta: {
                    title: "Totals per supplier",
                    api: "per-intervention-operator/{year}",
                },
            },
            {
                name: "stats-per-interventionType",
                path: "per-interventiontype",
                component: StatsPerInterventionType,
                meta: {
                    title: "Totals per intervention",
                    api: "per-interventiontype/{year}",
                },
            },
            {
                name: "stats-per-vehicle-per-type",
                path: "per-vehicle-per-type/{year}",
                components: {
                    default: StatsPerVehiclePerType,
                },
                meta: {
                    title: "Totals per vehicle per type",
                    api: "per-vehicle/{vehicleTypeCode}/{year}",
                },
            },
            {
                name: "stats-per-interventionType-and-vehicleType",
                path: "per-interventiontype-en-vehicletype",
                component: StatsPerInterventionTypePerVehicleType,
                meta: {
                    title: "Totals per intervention & vehicletype",
                    api: "per-interventiontype-and-vehicletype/{year}",
                },
            },
        ],
    },
]
