import { EntityBase } from "@/regira_modules/vue/entities"

export class InterventionType extends EntityBase {
    id: number = 0
    code?: string
    title: string
    description?: string
    created?: Date
    lastModified?: Date
    isArchived?: boolean

    _deleted: boolean = false

    override get $id(): string | number {
        return this.id || "new"
    }
    override get $title(): string | undefined {
        return this.title
    }

    static create(values?: object): InterventionType {
        return Object.assign(new InterventionType(), values || {})
    }
}

export const Entity = InterventionType

export default InterventionType
