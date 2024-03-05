import type { AxiosWithFilesInstance } from "@/regira_modules/vue/http/axios"
import { EntityServiceBase, type IConfig } from "@/regira_modules/vue/entities"
import { insertWithAttachments, updateWithAttachments } from "../../entity-attachments"
import Entity from "./Entity"

export class EntityService extends EntityServiceBase<Entity> {
    constructor(axios: AxiosWithFilesInstance, config: IConfig) {
        super(axios, config)
    }

    override async insert(item: Entity): Promise<Entity | null> {
        return await insertWithAttachments(this.config.api, item, async () => await super.insert(item))
    }
    override async update(item: Entity): Promise<Entity | null> {
        return await updateWithAttachments(this.config.api, item, async () => await super.update(item))
    }

    protected override prepareItem(item: Entity): Entity {
        item.attachments = item.attachments?.filter((x) => !x._deleted)
        return super.prepareItem(item)
    }

    override toEntity(item: object): Entity {
        return item instanceof Entity ? item : Object.assign(this.createInstance(Entity as new () => Entity), item || {})
    }
}

export default EntityService
