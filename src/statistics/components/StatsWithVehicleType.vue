<template>
    <div>
        <div class="row">
            <div class="col-md order-2 order-md-1 mb-2">
                <Filter v-model="filter" @fetch-data="handleFetchData" @fetch-doc="fetchDoc" />
            </div>
            <div class="col-auto order-1 mb-2">
                <NavLinks />
            </div>
        </div>

        <TableView :stats="stats" :error-msg="errorMsg" :is-loading="isLoading" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue"
import { useFetchStatistics } from "../functions"
import type { IFilter } from "../filter"
import Filter from "./YearVehicleTypeFilter.vue"
import NavLinks from "./NavLinks.vue"
import TableView from "./TableView.vue"

const props = defineProps<{
    api: string
    filter: IFilter
}>()

const filter = ref<IFilter>(props.filter ?? { year: new Date().getFullYear() })
const { stats, errorMsg, isLoading, fetchData, fetchDoc } = useFetchStatistics(props, filter)

function handleFetchData() {
    console.debug("handleFetchData")
    fetchData()
}

onMounted(fetchData)
watch(() => props.api, fetchData)
</script>
