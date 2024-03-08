<template>
    <div>
        <div class="row">
            <div class="col-md order-2 order-md-1 mb-2">
                <YearForm v-model="filter" @fetch-data="fetchData" @fetch-doc="fetchDoc" />
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
import YearForm from "./YearForm.vue"
import NavLinks from "./NavLinks.vue"
import TableView from "./TableView.vue"

const props = defineProps<{
    api: string
}>()

const filter = ref({ year: new Date().getFullYear() })
const { stats, errorMsg, isLoading, fetchData, fetchDoc } = useFetchStatistics(props, filter)

onMounted(fetchData)
watch(() => props.api,fetchData)
</script>
