import { SearchObjectBase } from "@/regira_modules/vue/entities"

export class EntitySearchObject extends SearchObjectBase {
    code?: string
    title?: string
    model?: string

    brandId?: number | Array<number>
    vehicleTypeId?: number | Array<number>

    minDate?: Date
    maxDate?: Date
    isBillable?: boolean
    isBilled?: boolean
}

export default EntitySearchObject
