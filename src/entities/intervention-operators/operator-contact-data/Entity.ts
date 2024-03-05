import { EntityBase } from "@/regira_modules/vue/entities"
import type ContactDataTypes from "./ContactDataTypes"

export class ContactData extends EntityBase {
    id: number = 0
    title?: string
    value: string
    dataType?: ContactDataTypes
    description?: string
    created: Date
    lastModified?: Date

    _deleted: boolean = false

    override get $id(): string | number {
        return this.id || "new"
    }
    override get $title(): string | undefined {
        return this.value
    }
}

export const Entity = ContactData

export default ContactData
