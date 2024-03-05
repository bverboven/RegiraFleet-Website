import { EntityBase } from "@/regira_modules/vue/entities"
import type { Entity as Brand } from "../../brands"
import type { Entity as VehicleType } from "../../vehicle-types"
import type { Entity as EntityAttachment } from "../../entity-attachments"

export class Vehicle extends EntityBase {
    id: number = 0
    code: string
    model: string

    brandId?: number
    vehicleTypeId?: number

    quantity?: number
    unitCategoryId?: number
    startDate?: Date = new Date()
    endDate?: Date
    isBillable: boolean | number = 1
    isBilled?: boolean | number

    description?: string
    notes?: string

    created: Date
    lastModified?: Date

    brand?: Brand
    vehicleType?: VehicleType
    attachments?: Array<EntityAttachment>

    override get $id(): string | number {
        return this.id || "new"
    }
    override get $title(): string | undefined {
        return `${this.brand?.title} ${this.model}`.trim() || this.code
    }
}

export const Entity = Vehicle

export default Vehicle
