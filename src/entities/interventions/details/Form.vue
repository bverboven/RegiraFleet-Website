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
                <RouterLink v-if="isPopup" :to="{ name: `${Entity.name}Details`, params: { id: item.$id } }" class="btn btn-default py-1" target="_blank"><Icon name="popOut" /></RouterLink>
                <RouterLink v-else v-if="overviewUrl" :to="overviewUrl" class="btn btn-info py-1"><Icon name="list" class="me-1" /> <span class="d-none d-sm-inline">Overview</span></RouterLink>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <TabContainer :tabs="tabs" :active="initialTab" :use-route-nav="!isPopup">
                    <template #form>
                        <FormSection :title="config.detailsTitle">
                            <div class="row">
                                <div class="col-md mb-2">
                                    <VehicleSelector v-model="item.vehicle" v-model:idValue="item.vehicleId" />
                                    <FormLabel label="Vehicle" />
                                </div>
                                <div class="col-md mb-2">
                                    <OperatorSelector v-model="item.operator" v-model:idValue="item.operatorId" :filter-defaults="operatorFilterDefaults" />
                                    <FormLabel label="Supplier" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col mb-2">
                                    <InterventionTypeSelector v-model="item.interventionTypes" :filter-defaults="interventionTypeFilterDefaults" placeholder="select type" />
                                    <FormLabel label="Intervention type(s)" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md mb-2">
                                    <div class="input-group">
                                        <input type="number" min="0" step="1" v-model="item.mileage" class="form-control" />
                                        <div class="input-group-text">Km</div>
                                    </div>
                                    <FormLabel label="Mileage" />
                                </div>
                                <div class="col-md mb-2">
                                    <div class="input-group">
                                        <div class="input-group-text">
                                            <Icon name="date" />
                                        </div>
                                        <DateInput v-model="item.interventionDate" :culture="$culture" class="form-control" />
                                    </div>
                                    <FormLabel label="Intervention Date" />
                                </div>
                            </div>
                        </FormSection>
                    </template>

                    <template #invoices>
                        <FormSection title="Invoice(s)">
                            ToDo: INVOICES
                            <Debug :modelValue="item.invoices" />
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
                item,
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
import { InputSelector as VehicleSelector } from "../../vehicles"
import { Selector as InterventionTypeSelector } from "../../intervention-types"
import { InputSelector as OperatorSelector } from "../../intervention-operators"
import config from "../config/config"
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

const { item, feedback, handleCancel, handleSubmit, handleRemove, handleRestore } = useForm<Entity>({ entityService, props, emit })

const operatorFilterDefaults = computed(() => ({ interventionTypeId: item.value.interventionTypes?.filter((x) => !x._deleted)?.map((x) => x.id) }))
const interventionTypeFilterDefaults = computed(() => ({ operatorId: item.value.operator?.id }))

// Tabs
const tabs = computed(() =>
    [Tab.create("form", { icon: "form", isDefault: true }), Tab.create("invoice(s)", { key: "invoices", icon: "invoice" }), Tab.create("files", { icon: "attachment" })].filter((x) => x)
)
</script>
