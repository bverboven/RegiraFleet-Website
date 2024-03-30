export class ClientUser {
    id?: string
    email: string
    displayName?: string
    permissions: Array<string> = []
}

export const Entity = ClientUser

export default ClientUser
