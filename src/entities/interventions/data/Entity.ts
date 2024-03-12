import { EntityBase } from "@/regira_modules/vue/entities"
import Invoice from "../intervention-invoices/Entity"
import type { Entity as Vehicle } from "../../vehicles"
import type { Entity as Operator } from "../../intervention-operators"
import type { Entity as InterventionType } from "../../intervention-types"
import type { Entity as EntityAttachment } from "../../entity-attachments"

export class Intervention extends EntityBase {
    id: number = 0
    vehicleId: number
    operatorId: number
    invoiceId?: number
    interventionTypeId: number
    interventionDate?: Date = new Date()
    mileage?: number
    description?: string
    notes?: string

    created?: Date
    lastModified?: Date

    isArchived?: boolean

    vehicle?: Vehicle
    operator?: Operator
    invoice: Invoice = new Invoice()
    interventionType: InterventionType
    attachments?: Array<EntityAttachment>

    override get $id(): string | number {
        return this.id || "new"
    }
    override get $title(): string | undefined {
        return `${this.interventionType?.title || "New intervention"} on ${this.vehicle?.code || "vehicle"}`
    }
}

export const Entity = Intervention

export default Intervention
