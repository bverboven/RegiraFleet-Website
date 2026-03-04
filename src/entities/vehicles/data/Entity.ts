import { EntityBase } from "@/regira_modules/vue/entities"
import type { Entity as Brand } from "../../brands"
import type { Entity as VehicleType } from "../../vehicle-types"
import type { EntityLabel } from "@/entities/entity-labels"
import type { Entity as EntityAttachment } from "../../entity-attachments"
import type { VehicleInterventionType } from "./VehicleInterventionType"

export class Vehicle extends EntityBase {
    id: number = 0
    code: string
    model: string

    brandId?: number
    vehicleTypeId?: number

    notes?: string

    created: Date
    lastModified?: Date

    brand?: Brand
    vehicleType?: VehicleType
    labels?: Array<EntityLabel>
    interventionTypes?: Array<VehicleInterventionType>
    attachments?: Array<EntityAttachment>

    override get $id(): string | number {
        return this.id || "new"
    }
    override get $title(): string | undefined {
        return `${this.code || ""} ${this.vehicleType?.title || ""}`.trim()
    }
}

export const Entity = Vehicle

export default Vehicle
