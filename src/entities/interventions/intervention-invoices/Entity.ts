import { EntityBase } from "@/regira_modules/vue/entities"
import { TaxCategory } from "./TaxCategory"

export class Invoice extends EntityBase {
    id: number = 0
    interventionId: number
    invoiceNumber: string
    invoiceDate?: Date
    taxCategory: TaxCategory
    priceExcl?: number
    priceIncl?: number
    taxAmount?: number

    description?: string

    created?: Date
    lastModified?: Date
    
    _deleted: boolean = false

    override get $id(): string | number {
        return this.id || "new"
    }
    override get $title(): string | undefined {
        return this.invoiceNumber
    }
}

export const Entity = Invoice

export default Invoice
