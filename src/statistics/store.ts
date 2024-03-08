import { ref } from "vue"
import { defineStore } from "pinia"
import type { IFilter } from "./filter"

export const useStatisticsStore = defineStore("StatisticsStore", () => {
    const filter = ref<IFilter>({ year: new Date().getFullYear() })

    return {
        filter,
    }
})

export default useStatisticsStore
