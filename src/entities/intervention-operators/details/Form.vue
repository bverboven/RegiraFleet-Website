<template>
    <form @submit.prevent="handleSubmit" :modelValue="item">
        <div class="row">
            <div class="col-auto mb-2 order-1">
                <FormButtonsRow :item="item" :feedback="feedback" :show-delete="item?.id > 0" @cancel="handleCancel" @remove="handleRemove" @restore="handleRestore" />
            </div>
            <div class="col-md mb-2 position-relative order-3 order-md-2">
                <Feedback :feedback="feedback" />
            </div>
            <div class="col col-md-auto order-2 order-md-3 text-end">
                <RouterLink v-if="isPopup" :to="{ name: `${Entity.name}Details`, params: { id: item.$id } }" class="btn btn-default py-1 ms-2" target="_blank"><Icon name="popOut" /></RouterLink>
                <RouterLink v-if="overviewUrl" :to="overviewUrl" class="btn btn-info py-1 ms-1"><Icon name="list" /><span class="d-none d-md-inline ms-1">Overview</span></RouterLink>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <TabContainer :tabs="tabs" :active="initialTab" :use-route-nav="!isPopup">
                    <template #form>
                        <FormSection title="Supplier">
                            <div class="row">
                                <div class="col mb-2">
                                    <div class="input-group required-input">
                                        <input class="form-control" v-model.trim="item.title" placeholder="Company title" required autocomplete="name" maxlength="128" />
                                    </div>
                                    <FormLabel label="Title" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col mb-2">
                                    <input class="form-control" v-model.trim="item.code" placeholder="code or abbr." maxlength="16" />
                                    <FormLabel label="Code" />
                                </div>
                                <div class="col mb-2">
                                    <input class="form-control" v-model.trim="item.identificationNumber" placeholder="ID" maxlength="16" />
                                    <FormLabel label="(VAT) identification" />
                                </div>
                            </div>
                        </FormSection>

                        <!-- Contact Data -->
                        <ContactData v-model="item.contactData" :stakeholder="item" :readonly="readonly" :show-summary="item.id > 0" />

                        <!-- Addresses -->
                        <Addresses v-model="item.addresses" :stakeholder="item" />

                        <FormSection title="Intervention types">
                            <div class="row">
                                <div class="col mb-2">
                                    <InterventionTypeSelector v-model="item.interventionTypes" placeholder="select type" />
                                    <FormLabel label="Intervention type(s)" />
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
                addresses: item.addresses?.map(({ id, street, city, countryCode }) => ({ id, street, city, countryCode })),
                contactData: item.contactData?.map(({ id, value, dataType }) => ({ id, value, dataType })),
                interventionTypes: item.interventionTypes?.map(({ id, title }) => ({ id, title })),
                attachments: item.attachments?.map(({ id, attachment, newFileName }) => ({ id, fileName: attachment?.fileName, newFileName })),
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
import { Selector as InterventionTypeSelector } from "../../intervention-types"
import { Overview as EntityAttachments } from "../../entity-attachments"
import { Overview as ContactData } from "../operator-contact-data"
import { Overview as Addresses } from "../operator-addresses"
import Entity from "../data/Entity"
import useEntityStore from "../data/store"

interface Emits extends /* @vue-ignore */ FormEmits<Entity> {}
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
const tabs = computed(() => [Tab.create("form", { icon: "form", isDefault: true }), Tab.create("files", { icon: "attachment" })].filter((x) => x))
</script>
