import type InterventionType from "@/entities/intervention-types/data/Entity";
import { EntityBase } from "@/regira_modules/vue/entities";

export class VehicleInterventionType extends EntityBase {
    id: number = 0
    interventionTypeId: number
    vehicleId: number

    interventionType: InterventionType
    
    _deleted: boolean = false

    override get $id(): string | number {
        return this.id || "new"
    }
    override get $title(): string | undefined {
        return this.interventionType?.title ?? "New intervention type"
    }

    static create(values?: object): VehicleInterventionType {
        return Object.assign(new VehicleInterventionType(), values || {})
    }
}