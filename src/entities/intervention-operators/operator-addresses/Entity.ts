import { EntityBase } from "@/regira_modules/vue/entities"
import { Country } from '../../countries/data/Entity';

export class Address extends EntityBase {
    id: number = 0
    title?: string
    street?: string
    number?: string
    box?: string
    postBox?: string
    postalCode?: string
    city?: string
    countryCode?: string

    description?: string

    _country?: Country
    _deleted: boolean = false

    override get $id(): string | number {
        return this.id || "new"
    }
    override get $title(): string | undefined {
        return this.title
    }
}

export const Entity = Address

export default Address
