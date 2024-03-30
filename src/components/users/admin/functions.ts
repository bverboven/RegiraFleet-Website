import { useAxios } from "@/regira_modules/vue/http"
import Entity from "./Entity"

export async function saveUser(item: Entity, siteUrl?: string) {
    const axios = useAxios()
    const response = await axios.post("/users", { ...item, siteUrl })
    console.debug("saveUser", { item, response })
    return Object.assign(new Entity(), response.data)
}
