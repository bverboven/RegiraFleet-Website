export class TenantUser {
    id?: string
    email: string
    displayName?: string
    permissions: Array<string> = []
}

export const Entity = TenantUser

export default TenantUser
