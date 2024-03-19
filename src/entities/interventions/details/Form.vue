<template>
    <form @submit.prevent="handleSubmit" :modelValue="item">
        <div class="row form-buttons">
            <div class="col col-md-auto order-1">
                <FormButtonsRow :item="item" :readonly="readonly" :feedback="feedback" :show-delete="item?.id > 0" @cancel="handleCancel" @remove="handleRemove" @restore="handleRestore" />
            </div>
            <div class="col-md order-3 order-md-2">
                <Feedback :feedback="feedback" />
            </div>
            <div class="col-auto order-2 order-md-3">
                <RouterLink v-if="isPopup" :to="{ name: `${Entity.name}Details`, params: { id: item.$id } }" class="btn btn-default py-1" target="_blank" :title="$t('popOut')">
                    <Icon name="popOut" />
                </RouterLink>
                <RouterLink v-else-if="overviewUrl" :to="overviewUrl" class="btn btn-info py-1">
                    <Icon name="list" /> <span class="d-none d-md-inline ms-1">{{ $t("overview") }}</span>
                </RouterLink>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <TabContainer :tabs="tabs" :active="initialTab" :use-route-nav="!isPopup">
                    <template #form>
                        <FormSection :title="$tm(config.detailsTitle)">
                            <div class="row">
                                <div class="col-md mb-2">
                                    <VehicleSelector
                                        v-model="item.vehicle"
                                        v-model:idValue="item.vehicleId"
                                        :readonly="readonly"
                                        :placeholder="$t('selectVehicle')"
                                        @update:modelValue="handleUpdateVehicle"
                                    />
                                    <FormLabel :label="$t('vehicle')" />
                                </div>
                                <div class="col-md mb-2">
                                    <div class="input-group">
                                        <div class="input-group-text">Km</div>
                                        <input type="number" :min="lastInterventionForVehicle?.mileage || 0" step="1" v-model="item.mileage" :readonly="readonly" class="form-control" />
                                    </div>
                                    <FormLabel v-if="!item.mileage && lastInterventionForVehicle?.mileage" :label="`(last: ${lastInterventionForVehicle.mileage.toLocaleString($culture)} km)`" />
                                    <FormLabel v-else :label="$t('mileage')" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md mb-2">
                                    <OperatorSelector
                                        v-model="item.operator"
                                        v-model:idValue="item.operatorId"
                                        :filter-defaults="operatorFilterDefaults"
                                        :readonly="readonly"
                                        :placeholder="$t('selectSupplier')"
                                        @update:modelValue="handleUpdateSupplier"
                                    />
                                    <FormLabel :label="$t('supplier')" />
                                </div>
                                <div class="col mb-2">
                                    <InterventionTypeSelector
                                        v-model="item.interventionType"
                                        v-model:idValue="item.interventionTypeId"
                                        :filter-defaults="interventionTypeFilterDefaults"
                                        :readonly="readonly"
                                        :placeholder="$t('selectType')"
                                    />
                                    <FormLabel :label="$t('interventionType')" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md mb-2">
                                    <div class="input-group">
                                        <div class="input-group-text">
                                            <Icon name="date" />
                                        </div>
                                        <DateInput v-model="item.interventionDate" :disabled="readonly" :culture="$culture" class="form-control" />
                                    </div>
                                    <FormLabel :label="$t('interventionDate')" />
                                </div>
                            </div>
                            <div class="row">
                                <DescriptionInput v-model="item.description" :readonly="readonly" :label="$t('notes')" />
                            </div>
                        </FormSection>

                        <!-- <InvoiceOverview v-model="item.invoice" :owner="item" :readonly="readonly" /> -->
                    </template>

                    <template #invoice>
                        <InvoiceOverview v-model="item.invoice" :owner="item" :readonly="readonly" />
                    </template>

                    <template #files>
                        <EntityAttachments v-model="item.attachments" :readonly="readonly" />
                    </template>
                </TabContainer>
            </div>
        </div>

        <Debug
            :modelValue="{
                item: {
                    ...item,
                    vehicle: item.vehicle && `${item.vehicle?.code} #${item.vehicle?.id}`,
                    operator: item.operator && `${item.operator?.title} #${item.operator?.id}`,
                    interventionType: item.interventionType && `${item.interventionType?.title} #${item.interventionType?.id}`,
                },
                allowedInterventionTypeIds,
                selectedVehicle: {
                    id: selectedVehicle?.id,
                    code: selectedVehicle?.code,
                    interventionTypes: selectedVehicle?.interventionTypes?.map((x) => x.id),
                },
                selectedOperator: {
                    id: selectedOperator?.id,
                    title: selectedOperator?.title,
                    interventionTypes: selectedOperator?.interventionTypes?.map((x) => x.id),
                },
            }"
        />
    </form>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from "vue"
import type { RouteRecordRaw } from "vue-router"
import { Feedback, TabContainer, Tab } from "@/regira_modules/vue/ui"
import { useForm, type FormEmits, formDefaults } from "@/regira_modules/vue/entities"
import { useLang } from "@/regira_modules/vue/lang"
import { DescriptionInput, FormButtonsRow } from "@/components/input"
import { Overview as EntityAttachments } from "../../entity-attachments"
import { type Entity as Vehicle, InputSelector as VehicleSelector, useEntityStore as useVehicleStore } from "../../vehicles"
import { InputSelector as InterventionTypeSelector } from "../../intervention-types"
import { type Entity as Operator, InputSelector as OperatorSelector, useEntityStore as useOperatorStore } from "../../intervention-operators"
import InvoiceOverview from "../intervention-invoices/Overview.vue"
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

const { service: operatorService } = useOperatorStore()
const { service: vehicleService } = useVehicleStore()
const selectedOperator = ref<Operator | null>(null)
const selectedVehicle = ref<Vehicle | null>(null)
const allowedInterventionTypeIds = computed<Array<number>>(() => {
    let ids: Array<number> = []
    if (selectedOperator.value?.interventionTypes?.length) {
        ids = selectedOperator.value.interventionTypes.map((x) => x.id)
    }
    if (selectedVehicle.value?.interventionTypes?.length) {
        const typeIds = selectedVehicle.value.interventionTypes.map((x) => x.id)
        ids = !ids?.length ? typeIds : ids.filter((x) => typeIds.includes(x))
    }
    return ids
})
const operatorFilterDefaults = computed(() => ({ interventionTypeId: item.value.interventionTypeId || selectedVehicle.value?.interventionTypes?.map((x) => x.id) }))
const interventionTypeFilterDefaults = computed(() => ({ ids: allowedInterventionTypeIds.value }))

const lastInterventionForVehicle = ref<Entity>()

function handleUpdateVehicle(item?: Vehicle) {
    if (item?.interventionTypes?.length) {
        selectedVehicle.value = item
    }
}
function handleUpdateSupplier(item?: Operator) {
    if (item?.interventionTypes?.length) {
        selectedOperator.value = item
    }
}

// operator details
watchEffect(async () => {
    if (item.value.operatorId) {
        selectedOperator.value = await operatorService.details(item.value.operatorId)
    } else {
        selectedOperator.value = null
    }
})
// vehicle details
watchEffect(async () => {
    if (item.value.vehicleId) {
        selectedVehicle.value = await vehicleService.details(item.value.vehicleId)
    } else {
        selectedVehicle.value = null
    }
})

// last known mileage
watchEffect(async () => {
    if (item.value.id) {
        return
    }

    if (item.value?.vehicleId) {
        lastInterventionForVehicle.value = (await entityService.list({ vehicleId: item.value.vehicleId, sortBy: "DateDesc", pageSize: 1 }))[0]
    } else {
        lastInterventionForVehicle.value = undefined
    }
})

// Tabs
const { translate } = useLang()
const tabs = computed(() =>
    [
        Tab.create("form", { icon: "form", title: translate("form"), isDefault: true }),
        Tab.create("invoice", { icon: "invoice", title: translate("invoice") }),
        Tab.create("files", { icon: "attachment", title: translate("files") }),
    ].filter((x) => x)
)
</script>
