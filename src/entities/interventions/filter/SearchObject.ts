import { SearchObjectBase } from "@/regira_modules/vue/entities"

export class EntitySearchObject extends SearchObjectBase {
    code?: string
    title?: string

    interventionTypeId?: number | Array<number>
    operatorId?: number
    vehicleId?: number
    vehicleTypeId?: number
    brandId?: number

    minDate?: Date
    maxDate?: Date

    minCreated?: Date
    maxCreated?: Date
    minLastModified?: Date
    maxLastModified?: Date

    isArchived?: boolean
}

export default EntitySearchObject
