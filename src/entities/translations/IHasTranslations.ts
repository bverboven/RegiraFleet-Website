import type Entity from "./Entity"

export interface IHasTranslations {
    title?: string
    translations?: Array<Entity>
}
