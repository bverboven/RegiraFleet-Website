declare module "vue" {
    interface ComponentCustomProperties {
        $activeTenant: any
        $isAdmin: boolean
        $isReadonlyUser: boolean
    }
}

export {}
