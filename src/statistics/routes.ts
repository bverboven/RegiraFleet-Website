import Permissions from "@/infrastructure/permissions"

import StatisticsView from "@/views/StatisticsView.vue"
import YearFilter from "@/statistics/YearFilter.vue"
import YearVehicleTypeFilter from "@/statistics/YearVehicleTypeFilter.vue"
import StatsPerVehicleType from "@/views/Dummy.vue"
import StatsPerVehiclePerType from "@/views/Dummy.vue"
import StatsPerVehicle from "@/views/Dummy.vue"
import StatsPerSupplier from "@/views/Dummy.vue"
import StatsPerInterventionType from "@/views/Dummy.vue"
import StatsPerInterventionTypePerVehicleType from "@/views/Dummy.vue"

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
                components: {
                    default: StatsPerVehicle,
                    filter: YearFilter,
                },
                meta: {
                    title: "Totals per vehicle",
                },
            },
            {
                name: "stats-per-vehicleType",
                path: "per-vehicletype",
                components: {
                    default: StatsPerVehicleType,
                    filter: YearFilter,
                },
                meta: {
                    title: "Totals per vehicletype",
                },
            },
            {
                name: "stats-per-vehicle-per-type",
                path: "per-vehicle-per-type",
                components: {
                    default: StatsPerVehiclePerType,
                    filter: YearVehicleTypeFilter,
                },
                meta: {
                    title: "Totals per vehicle per type",
                },
            },
            {
                name: "stats-per-intervention",
                path: "per-intervention",
                components: {
                    default: StatsPerInterventionType,
                    filter: YearFilter,
                },
                meta: {
                    title: "Totals per intervention",
                },
            },
            {
                name: "stats-per-intervention-and-vehicleType",
                path: "per-intervention-en-vehicletype",
                components: {
                    default: StatsPerInterventionTypePerVehicleType,
                    filter: YearFilter,
                },
                meta: {
                    title: "Totals per intervention & vehicletype",
                },
            },
            {
                name: "stats-per-supplier",
                path: "per-supplier",
                components: {
                    default: StatsPerSupplier,
                    filter: YearFilter,
                },
                meta: {
                    title: "Totals per supplier",
                },
            },
        ],
    },
]
