import { SearchObjectBase, ArchivedFilter } from "regira_modules/vue/entities"

export class EntitySearchObject extends SearchObjectBase {
    code?: string
    title?: string
    identificationNumber?: string

    address?: string
    phone?: string
    email?: string

    minCreated?: Date
    maxCreated?: Date
    minLastModified?: Date
    maxLastModified?: Date

    archived?: ArchivedFilter
}

export default EntitySearchObject
