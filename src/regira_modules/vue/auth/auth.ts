import type { AxiosInstance } from "axios"
import type { ITokenManager } from "./token-manager"
import { AuthService, type IAuthService } from "./auth-service"

interface IAuth {
    enabled: boolean
    clientApp?: string
    tokenManager: ITokenManager
    service: IAuthService
}

type Input = { enabled: boolean; clientApp?: string; tokenManager: ITokenManager; axios: AxiosInstance }

let auth: IAuth
export function createAuth({ enabled, clientApp, tokenManager, axios }: Input): IAuth {
    auth = {
        enabled,
        clientApp,
        tokenManager,
        service: new AuthService(axios, tokenManager),
    }

    return auth
}

export const useAuth = () => auth
