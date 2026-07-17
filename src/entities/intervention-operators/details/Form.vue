<template>
    <form @submit.prevent="handleSubmit" :modelValue="item">
        <div class="row form-buttons">
            <div class="col col-md-auto order-1">
                <FormButtonsRow :item="item" :readonly="readonly" :feedback="feedback" :show-delete="item?.id > 0" @cancel="handleCancel" @remove="handleRemove" @restore="handleRestore" />
            </div>
            <div class="col-auto order-2 order-md-3">
                <RouterLink v-if="isPopup" :to="{ name: `${config.key}Details`, params: { id: item.$id } }" class="btn btn-default py-1" target="_blank" :title="$t('popOut')">
                    <Icon name="popOut" />
                </RouterLink>
                <RouterLink v-else-if="overviewUrl" :to="overviewUrl" class="btn btn-info py-1">
                    <Icon name="list" /> <span class="d-none d-md-inline ms-1">{{ $t("overview") }}</span>
                </RouterLink>
            </div>
            <div class="col-md order-3 order-md-2">
                <Feedback :feedback="feedback" />
            </div>
        </div>

        <div class="row">
            <div class="col">
                <TabContainer :tabs="tabs" :active="initialTab" :use-route-nav="!isPopup">
                    <template #form>
                        <FormSection :title="$t('supplier')">
                            <div class="row">
                                <div class="col mb-2">
                                    <div class="input-group required-input">
                                        <input class="form-control" v-model.trim="item.title" :readonly="readonly" :placeholder="$t('companyTitle')" required autocomplete="name" maxlength="128" />
                                    </div>
                                    <FormLabel :label="$t('name')" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col mb-2">
                                    <input class="form-control" v-model.trim="item.code" :readonly="readonly" :placeholder="$t('codePlaceholder')" maxlength="16" />
                                    <FormLabel :label="$t('code')" />
                                </div>
                                <div class="col mb-2">
                                    <input class="form-control" v-model.trim="item.identificationNumber" :readonly="readonly" placeholder="ID" maxlength="16" />
                                    <FormLabel :label="$t('vatIdentification')" />
                                </div>
                            </div>
                        </FormSection>

                        <!-- Contact Data -->
                        <ContactData v-model="item.contactData" :owner="item" :readonly="readonly" />

                        <!-- Addresses -->
                        <Addresses v-model="item.addresses" :owner="item" :readonly="readonly" />
                    </template>

                    <template #extra>
                        <Labels v-model="item.labels" :show-summary="item.id > 0" />

                        <FormSection :title="$t('interventionTypes')">
                            <p v-if="readonly && !item.interventionTypes?.length" class="text-info">{{ $t("noItems") }}</p>
                            <div v-else class="row" style="min-height: 10rem">
                                <div class="col mb-2">
                                    <InputSelectorInline v-model="item.interventionTypes"
                                        :row-key="(r) => r.interventionTypeId" :exclude-key="(r) => r.interventionTypeId">
                                        <template #chip="{ row }">
                                            <InterventionTypeButton :modelValue="row.interventionType" />
                                        </template>
                                        <template #selector="{ add, exclude }">
                                            <InterventionTypeSelector :filter-defaults="{ exclude }"
                                                :placeholder="$t('selectType')"
                                                @select="(it?: InterventionType) => it && add(OperatorInterventionType.create({ interventionTypeId: it.id, interventionType: it, operatorId: item.id }))" />
                                        </template>
                                    </InputSelectorInline>
                                    <FormLabel :label="$t('interventionType(s)')" />
                                </div>
                            </div>
                        </FormSection>
                    </template>

                    <template #contact>
                        <!-- Contact Data -->
                        <ContactData v-model="item.contactData" :owner="item" :readonly="readonly" />

                        <!-- Addresses -->
                        <Addresses v-model="item.addresses" :owner="item" :readonly="readonly" />
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

        <Debug :modelValue="{
            ...item,
            addresses: item.addresses?.map(({ id, street, city, countryCode }) => ({ id, street, city, countryCode })),
            contactData: item.contactData?.map(({ id, value, dataType }) => ({ id, value, dataType })),
            interventionTypes: item.interventionTypes?.map((x) => x.interventionType?.title),
            attachments: item.attachments?.map(({ id, attachment, newFileName }) => ({ id, fileName: attachment?.fileName, newFileName })),
        }" />
    </form>
</template>

<script setup lang="ts">
import { computed } from "vue"
import type { RouteRecordRaw } from "vue-router"
import { Feedback, TabContainer, Tab } from "regira_modules/vue/ui"
import { useForm, InputSelectorInline, type FormEmits, formDefaults } from "regira_modules/vue/entities"
import { useLang } from "regira_modules/vue/lang"
import { FormButtonsRow } from "@/components/input"
import { Entity as Intervention } from "../../interventions"
import { Overview as Labels } from "../../entity-labels"
import { InputSelector as InterventionTypeSelector, FormModalButton as InterventionTypeButton } from "../../intervention-types"
import { Overview as EntityAttachments } from "../../entity-attachments"
import { Overview as ContactData } from "../operator-contact-data"
import { Overview as Addresses } from "../operator-addresses"
import Interventions from "../operator-interventions/Overview.vue"
import Entity from "../data/Entity"
import config from "../config/config"
import useEntityStore from "../data/store"
import { OperatorInterventionType } from "../data/OperatorInterventionType"
import InterventionType from "@/entities/intervention-types/data/Entity"

interface Emits extends /* @vue-ignore */ FormEmits<Entity> { }
const emit = defineEmits<Emits>()
const props = withDefaults(
    defineProps<{
        modelValue: Entity
        initialTab?: string
        readonly?: boolean
        isPopup?: boolean
        overviewUrl?: string | RouteRecordRaw
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
        Tab.create("extra", { icon: "tag", title: translate("extra") }),
        Tab.create("files", { icon: "attachment", title: translate("files") }),
        Tab.create("interventions", { icon: Intervention.name, title: translate("interventions"), isDisabled: !item.value?.id }),
    ].filter((x) => x)
)
</script>
