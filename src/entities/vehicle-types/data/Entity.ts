import { EntityBase } from "@/regira_modules/vue/entities"
import type { IHasTranslations, Translation } from "@/entities/translations"

export class VehicleType extends EntityBase implements IHasTranslations {
    id: number = 0
    code?: string
    title: string
    description?: string
    created?: Date
    lastModified?: Date
    isArchived?: boolean

    translations?: Array<Translation>

    _deleted: boolean = false

    override get $id(): string | number {
        return this.id || "new"
    }
    override get $title(): string | undefined {
        return this.title
    }
}

export const Entity = VehicleType

export default VehicleType
