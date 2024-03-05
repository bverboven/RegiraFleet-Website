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
                <button
                    v-if="(item?.id || 0) > 0"
                    type="button"
                    title="toggle hierarchy"
                    class="btn btn-info py-1 me-1 d-none d-xl-inline"
                    :class="{ 'opacity-50': !showSideTree }"
                    @click="showSideTree = !showSideTree"
                >
                    <Icon name="tree" />
                </button>
                <RouterLink v-if="isPopup" :to="{ name: `${Entity.name}Details`, params: { id: item.$id } }" class="btn btn-default py-1" target="_blank"><Icon name="popOut" /></RouterLink>
                <RouterLink v-else v-if="overviewUrl" :to="overviewUrl" class="btn btn-info py-1"><Icon name="list" class="me-1" /> <span class="d-none d-sm-inline">Overview</span></RouterLink>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <TabContainer :tabs="tabs" :active="initialTab" :use-route-nav="!isPopup">
                    <template #form>
                        <FormSection :title="config.detailsTitle" :readonly="readonly">
                            <div class="row">
                                <div class="col-md mb-2">
                                    <div class="input-group">
                                        <div class="input-group-text"><Icon name="code" /></div>
                                        <input v-model="item.code" maxlength="8" class="form-control" />
                                    </div>
                                    <FormLabel label="Code" />
                                </div>
                                <div class="col-md mb-2">
                                    <div class="input-group">
                                        <div class="input-group-text"><Icon name="title" /></div>
                                        <input v-model="item.title" maxlength="128" class="form-control" />
                                    </div>
                                    <FormLabel label="Title" />
                                </div>
                            </div>
                        </FormSection>
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
import { ref, computed } from "vue"
import type { RouteRecordRaw } from "vue-router"
import { Feedback, TabContainer, Tab, useScreen } from "@/regira_modules/vue/ui"
import { FormButtonsRow } from "@/components/input"
import { useForm, type FormEmits, formDefaults } from "@/regira_modules/vue/entities"
import config from "../config/config"
import Entity from "../data/Entity"
import useEntityStore from "../data/store"

interface Emits extends /* @vue-ignore */ FormEmits<Entity> {}
const emit = defineEmits<Emits>()
const props = withDefaults(
    defineProps<{
        modelValue: Entity
        readonly?: boolean
        overviewUrl?: string | RouteRecordRaw
        isPopup?: boolean
        initialTab?: string
    }>(),
    { ...formDefaults }
)

const { service: entityService } = useEntityStore()

const { item, feedback, handleCancel, handleSubmit, handleRemove, handleRestore } = useForm<Entity>({ entityService, props, emit })

const showSideTree = ref<boolean>(true)

// Tabs
const tabs = computed(() => [Tab.create("form", { icon: "form", isDefault: true })].filter((x) => x))
</script>
