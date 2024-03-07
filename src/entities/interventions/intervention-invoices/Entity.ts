import { EntityBase } from "@/regira_modules/vue/entities"

export class Invoice extends EntityBase {
    id: number = 0
    interventionId: number
    invoiceNumber: string

    invoiceDate?: Date
    created?: Date
    lastModified?: Date

    override get $id(): string | number {
        return this.id || "new"
    }
    override get $title(): string | undefined {
        return this.invoiceNumber
    }
}

export const Entity = Invoice

export default Invoice
