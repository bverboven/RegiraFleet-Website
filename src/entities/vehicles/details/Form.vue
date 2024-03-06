<template>
    <form @submit.prevent="handleSubmit" :modelValue="item">
        <div class="row mb-1">
            <div class="col-auto mb-2">
                <FormButtonsRow :item="item" :feedback="feedback" :show-delete="item?.id > 0" @cancel="handleCancel" @remove="handleRemove" @restore="handleRestore" />
            </div>
            <div class="col mb-2">
                <Feedback :feedback="feedback" />
            </div>
            <div class="col-auto">
                <template v-if="isPopup">
                    <RouterLink :to="{ name: `${Entity.name}Details`, params: { id: item.$id } }" target="_blank"><Icon name="popOut" /></RouterLink>
                </template>
                <template v-if="!isPopup && overviewUrl">
                    <RouterLink :to="overviewUrl" class="btn btn-info py-1"><Icon name="list" class="me-1" /> <span class="d-none d-sm-inline">Overview</span></RouterLink>
                </template>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <TabContainer :tabs="tabs" :active="initialTab" :use-route-nav="!isPopup">
                    <template #form>
                        <FormSection title="Vehicle">
                            <div class="row">
                                <div class="col-md mb-2">
                                    <div class="input-group">
                                        <div class="input-group-text"><Icon name="code" /></div>
                                        <input v-model="item.code" required class="form-control" />
                                    </div>
                                    <FormLabel label="Code" />
                                </div>
                                <div class="col-md mb-2">
                                    <VehicleTypeSelector v-model="item.vehicleType" v-model:idValue="item.vehicleTypeId as number" placeholder="vehicle type" />
                                    <FormLabel label="Type" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md mb-2">
                                    <BrandSelector v-model="item.brand" v-model:idValue="item.brandId as number" placeholder="brand" />
                                    <FormLabel label="Brand" />
                                </div>
                                <div class="col-md mb-2">
                                    <div class="input-group">
                                        <div class="input-group-text"><Icon name="title" /></div>
                                        <input v-model="item.model" class="form-control" />
                                    </div>
                                    <FormLabel label="Model" />
                                </div>
                            </div>
                        </FormSection>
                    </template>

                    <template #files>
                        <EntityAttachments v-model="item.attachments" />
                    </template>
                </TabContainer>
            </div>
        </div>

        <Debug
            :modelValue="{
                ...item,
                brand: item.brand ? `${item.brand.title} #${item.brand.id}` : undefined,
                vehicleType: item.vehicleType ? `${item.vehicleType.title} #${item.vehicleType.id}` : undefined,
            }"
        />
    </form>
</template>

<script setup lang="ts">
import { computed } from "vue"
import type { RouteRecordRaw } from "vue-router"
import { Feedback, TabContainer, Tab } from "@/regira_modules/vue/ui"
import { useForm, type FormEmits, formDefaults } from "@/regira_modules/vue/entities"
import { FormButtonsRow } from "@/components/input"
import { Overview as EntityAttachments } from "../../entity-attachments"
import { InputSelector as BrandSelector } from "../../brands"
import { InputSelector as VehicleTypeSelector } from "../../vehicle-types"
import Entity from "../data/Entity"
import useEntityStore from "../data/store"

interface Emits extends /* @vue-ignore */ FormEmits<Entity> {}
const emit = defineEmits<Emits>()
const props = withDefaults(
    defineProps<{
        modelValue: Entity
        initialTab?: string
        readonly?: boolean
        overviewUrl?: string | RouteRecordRaw
        isPopup?: boolean
    }>(),
    { ...formDefaults }
)

const { service: entityService } = useEntityStore()

const { item, feedback, handleCancel, handleSubmit, handleRemove, handleRestore } = useForm({ entityService, props, emit })

// Tabs
const tabs = computed(() => [Tab.create("form", { icon: "form", isDefault: true }), Tab.create("files", { icon: "attachment" })].filter((x) => x))
</script>
