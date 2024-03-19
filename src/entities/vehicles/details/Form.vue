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
                        <FormSection title="Vehicle">
                            <div class="row">
                                <div class="col-md mb-2">
                                    <div class="input-group">
                                        <div class="input-group-text"><Icon name="code" /></div>
                                        <input v-model="item.code" required :readonly="readonly" :placeholder="$t('vehicleCodePlaceholder')" class="form-control" />
                                    </div>
                                    <FormLabel :label="$t('code')" />
                                </div>
                                <div class="col-md mb-2">
                                    <VehicleTypeSelector v-model="item.vehicleType" v-model:idValue="item.vehicleTypeId as number" :readonly="readonly" :placeholder="$t('selectType')" />
                                    <FormLabel :label="$t('type')" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md mb-2">
                                    <BrandSelector v-model="item.brand" v-model:idValue="item.brandId as number" :readonly="readonly" :placeholder="$t('selectBrand')" />
                                    <FormLabel :label="$t('brand')" />
                                </div>
                                <div class="col-md mb-2">
                                    <div class="input-group">
                                        <div class="input-group-text"><Icon name="title" /></div>
                                        <input v-model="item.model" :readonly="readonly" class="form-control" :placeholder="$t('modelPlaceholder')" />
                                    </div>
                                    <FormLabel :label="$t('model')" />
                                </div>
                            </div>
                        </FormSection>

                        <FormSection :title="$t('interventionType')">
                            <div class="row">
                                <div class="col mb-2">
                                    <InterventionTypeSelector v-model="item.interventionTypes" :readonly="readonly" :placeholder="$t('selectType')" />
                                    <FormLabel :label="$t('allowedInterventionTypes')" />
                                </div>
                            </div>
                        </FormSection>
                    </template>

                    <template #files>
                        <EntityAttachments v-model="item.attachments" :readonly="readonly" />
                    </template>

                    <template #interventions>
                        <Interventions :owner="item" :readonly="readonly" />
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
import { useLang } from "@/regira_modules/vue/lang"
import { FormButtonsRow } from "@/components/input"
import { Overview as EntityAttachments } from "../../entity-attachments"
import { InputSelector as BrandSelector } from "../../brands"
import { InputSelector as VehicleTypeSelector } from "../../vehicle-types"
import { Entity as Intervention } from "../../interventions"
import { Selector as InterventionTypeSelector } from "../../intervention-types"
import Entity from "../data/Entity"
import useEntityStore from "../data/store"
import Interventions from "../vehicle-interventions/Overview.vue"

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
const { translate } = useLang()
const tabs = computed(() =>
    [
        Tab.create("form", { icon: "form", title: translate("form"), isDefault: true }),
        Tab.create("files", { icon: "attachment", title: translate("files") }),
        Tab.create("interventions", { icon: Intervention.name, title: translate("interventions"), isDisabled: !item.value?.id }),
    ].filter((x) => x)
)
</script>
