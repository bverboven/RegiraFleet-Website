import { EntityBase } from "@/regira_modules/vue/entities"
import type { Entity as Address } from "../operator-addresses"
import { ContactDataTypes, type Entity as ContactData } from "../operator-contact-data"
import type { EntityLabel } from "@/entities/entity-labels"
import type { Entity as EntityAttachment } from "@/entities/entity-attachments"
import type { OperatorInterventionType } from "./OperatorInterventionType"

export class InterventionOperator extends EntityBase {
    id: number = 0
    code?: string
    title: string
    identificationNumber?: string

    description?: string
    notes?: string

    created?: Date
    lastModified?: Date
    isArchived?: boolean

    addresses?: Array<Address>
    contactData?: Array<ContactData>
    labels?: Array<EntityLabel>
    interventionTypes?: Array<OperatorInterventionType>
    attachments?: Array<EntityAttachment>

    override get $id(): string | number {
        return this.id || "new"
    }
    override get $title(): string | undefined {
        return this.title
    }

    // main address
    get $address(): Address | undefined {
        if (this.addresses?.length || 0 > 0) {
            return this.addresses![0]
        }
        return undefined
    }
    // main phone
    get $phone(): string | undefined {
        return this.contactData?.filter((x) => [ContactDataTypes.phone, ContactDataTypes.mobile].includes(x.dataType!)).map((x) => x.value)[0]
    }
    // main email
    get $email(): string | undefined {
        return this.contactData?.filter((x) => ContactDataTypes.email === x.dataType).map((x) => x.value)[0]
    }
    // main website
    get $website(): string | undefined {
        return this.contactData?.filter((x) => ContactDataTypes.website === x.dataType).map((x) => x.value)[0]
    }
}

export const Entity = InterventionOperator

export default InterventionOperator
