import { useGlobalAuth } from "regira_modules/vue/auth"

// Whose rows a page shows: the user and their active tenant. A tenant switch keeps the user id, and the next
// tenant must not see (or save) the previous one's rows, so the overviews, details and the pool compare this
type AuthClaims = { userId?: string; get(claimType: string): string | Array<string> | undefined }
export function shownAccount(auth: AuthClaims | undefined = useGlobalAuth()?.authData): string | undefined {
    return auth?.userId ? `${auth.userId}|${auth.get("tenant") ?? ""}` : undefined
}
