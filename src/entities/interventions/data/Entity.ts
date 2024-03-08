import { EntityBase } from "@/regira_modules/vue/entities"
import type Invoice from "../intervention-invoices/Entity"
import type { Entity as Vehicle } from "../../vehicles"
import type { Entity as InterventionOperator } from "../../intervention-operators"
import type { Entity as InterventionType } from "../../intervention-types"
import type { Entity as EntityAttachment } from "../../entity-attachments"

export class Intervention extends EntityBase {
    id: number = 0
    vehicleId: number
    operatorId: number
    mileage?: number
    description?: string
    notes?: string

    interventionDate?: Date = new Date()
    created?: Date
    lastModified?: Date

    isArchived?: boolean

    vehicle?: Vehicle
    operator?: InterventionOperator
    invoices?: Array<Invoice>
    interventionTypes?: Array<InterventionType>
    attachments?: Array<EntityAttachment>

    override get $id(): string | number {
        return this.id || "new"
    }
    override get $title(): string | undefined {
        if (!this.interventionTypes?.length) {
            return ""
        }
        return `${this.interventionTypes?.map((x) => x.title).join(", ") || "New intervention"} on ${this.vehicle?.code || "vehicle"}`
    }
}

export const Entity = Intervention

export default Intervention
