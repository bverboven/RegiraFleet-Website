import { ref, type Ref } from "vue"
import { saveAs } from "@/regira_modules/utilities/file-utility"
import { useAxios } from "@/regira_modules/vue/http"

export function useFetchStatistics(props: { api: string }, filter: Ref<{ year: number; vehicleTypeId?: number }>) {
    const stats = ref<any>([[]])
    const isLoading = ref(false)
    const errorMsg = ref<string>()

    async function fetchData() {
        console.debug("stats.fetchData", { api: props.api, filter: { ...filter.value } })
        const axios = useAxios()
        const url = `stats/${props.api.replace("{year}", filter.value.year.toString()).replace("{vehicleTypeId}", filter.value.vehicleTypeId?.toString() || "")}/?asTable=true`
        const response = await axios.get(url)
        stats.value = response.data
    }
    async function fetchDoc(type: string = "xlsx") {
        const axios = useAxios()
        const url = `stats/${props.api.replace("{year}", filter.value.year.toString()).replace("{vehicleTypeId}", filter.value.vehicleTypeId?.toString() || "")}/xlsx`
        const blob = await axios.getFile(url)
        await saveAs(blob, (blob as any).name || `${props.api}-${filter.value.year}.${type}`)
    }

    return {
        stats,
        isLoading,
        errorMsg,

        fetchData,
        fetchDoc,
    }
}
