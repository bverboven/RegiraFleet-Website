<template>
    <div class="adv-filter" style="min-height: 50vh">
        <div class="row">
            <div class="col mb-2" v-if="resultCount != null">
                <span class="text-info">{{ resultCount }} results</span>
                <small v-if="filterIsActive" class="ms-2 italic-muted">(Filters are applied)</small>
            </div>
            <div class="col mb-2 text-end">
                <IconButton icon="clear" @click="handleReset" :showText="true" />
            </div>
        </div>

        <!-- keywords -->
        <div class="row">
            <div class="col mb-2">
                <div class="input-group">
                    <div class="input-group-text"><Icon name="search" /></div>
                    <input v-model.lazy.trim="searchObject.q" class="form-control" :placeholder="$t('keywords')" />
                </div>
            </div>
        </div>

        <div class="row">
            <!-- code -->
            <div class="col mb-2">
                <div class="input-group">
                    <div class="input-group-text"><Icon name="code" /></div>
                    <input v-model.lazy.trim="searchObject.code" class="form-control" placeholder="code" />
                </div>
            </div>
            <!-- VehicleType -->
            <div class="col-md mb-2">
                <VehicleTypeSelector v-model="vehicleType" v-model:idValue="searchObject.vehicleTypeId as number" placeholder="vehicle type" @select="handleUpdate">
                    <template #prepend>
                        <div class="input-group-text"><Icon :name="VehicleType.name" /></div>
                    </template>
                </VehicleTypeSelector>
            </div>
        </div>

        <div class="row">
            <!-- Brand -->
            <div class="col-md mb-2">
                <BrandSelector v-model="brand" v-model:idValue="searchObject.brandId as number" placeholder="brand" @select="handleUpdate">
                    <template #prepend>
                        <div class="input-group-text"><Icon :name="Brand.name" /></div>
                    </template>
                </BrandSelector>
            </div>
            <!-- model -->
            <div class="col mb-2">
                <div class="input-group">
                    <div class="input-group-text"><Icon name="title" /></div>
                    <input v-model.lazy.trim="searchObject.model" class="form-control" placeholder="model" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { useVModelField } from "@/regira_modules/vue/vue-helper"
import { useFilter, type FilterEmits } from "@/regira_modules/vue/entities"
import { useAuthStore } from "@/regira_modules/vue/auth"
import { Entity as Brand, InputSelector as BrandSelector } from "../../brands"
import { Entity as VehicleType, InputSelector as VehicleTypeSelector } from "../../vehicle-types"
import SearchObject from "./SearchObject"

interface Emits extends /* @vue-ignore */ FilterEmits {}

const emit = defineEmits<Emits>()
const props = defineProps<{
    modelValue: SearchObject
    resultCount?: number | null
}>()

const searchObject = useVModelField<SearchObject>(props, emit)

const brand = ref<Brand>()
const vehicleType = ref<VehicleType>()

const { filterIsActive, handleReset, handleUpdate } = useFilter({ searchObject, emit, Constructor: SearchObject })

const { hasPermission } = useAuthStore()
const showOperatorFilter = computed(() => hasPermission("ReadAllActivities"))
</script>
