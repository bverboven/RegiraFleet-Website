<template>
    <div class="adv-filter">
        <div class="row">
            <div class="col mb-2" v-if="resultCount != null">
                <span class="text-info">{{ resultCount }} results</span>
                <small v-if="filterIsActive" class="ms-2 italic-muted">(Filters are applied)</small>
            </div>
            <div class="col mb-2 text-end">
                <IconButton icon="clear" @click="handleReset" :showText="true" />
            </div>
        </div>
        <div class="row">
            <!-- keywords -->
            <div class="col mb-2">
                <div class="input-group">
                    <div class="input-group-text"><Icon name="search" /></div>
                    <input v-model.lazy.trim="searchObject.q" class="form-control" placeholder="keyword(s)" />
                </div>
            </div>
        </div>
        <div class="row">
            <!-- title -->
            <div class="col mb-2">
                <div class="input-group">
                    <div class="input-group-text"><Icon name="title" /></div>
                    <input v-model.lazy.trim="searchObject.title" class="form-control" placeholder="title" />
                </div>
            </div>
            <div class="col mb-2">
                <SupplierSelector v-model="supplier" v-model:idValue="searchObject.supplierId" :filter-defaults="{ hasIntervention: true }" placeholder="supplier" @select="handleUpdate" />
            </div>
        </div>
        <div class="row">
            <div class="col mb-2">
                <InterventionTypeSelector v-model="interventionType" v-model:idValue="searchObject.interventionTypeId as number" placeholder="intervention type" @select="handleUpdate" />
            </div>
            <div class="col mb-2">
                <VehicleSelector v-model="vehicle" v-model:idValue="searchObject.vehicleId" :filter-defaults="{ hasIntervention: true }" placeholder="vehicle" @select="handleUpdate" />
            </div>
        </div>
        <!-- 
        <div class="row">
            <div class="col mb-2">
                <InterventionTypesSelector v-model="interventionTypes" v-model:idsValue="searchObject.interventionTypeId" placeholder="intervention types" @update:idsValue="handleUpdate" />
            </div>
        </div> 
        -->
        <div class="row">
            <div class="col mb-2">
                <BrandSelector v-model="brand" v-model:idValue="searchObject.brandId" placeholder="vehicle brand" @select="handleUpdate" />
            </div>
            <div class="col mb-2">
                <VehicleTypeSelector v-model="vehicleType" v-model:idValue="searchObject.vehicleTypeId" placeholder="vehicle type" @select="handleUpdate" />
            </div>
        </div>
        <div class="row">
            <!-- minDate -->
            <div class="col-sm mb-2">
                <div class="input-group">
                    <div class="input-group-text">
                        <Icon name="from" />
                    </div>
                    <input type="date" v-model="searchObject.minDate" class="form-control" />
                </div>
            </div>
            <!-- maxDate -->
            <div class="col-sm mb-2">
                <div class="input-group">
                    <div class="input-group-text">
                        <Icon name="to" />
                    </div>
                    <input type="date" v-model="searchObject.maxDate" class="form-control" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useVModelField } from "@/regira_modules/vue/vue-helper"
import { useFilter, type FilterEmits } from "@/regira_modules/vue/entities"
import { type Entity as InterventionType, InputSelector as InterventionTypeSelector, Selector as InterventionTypesSelector } from "../../intervention-types"
import { type Entity as Supplier, InputSelector as SupplierSelector } from "../../intervention-operators"
import { type Entity as Vehicle, InputSelector as VehicleSelector } from "../../vehicles"
import { type Entity as VehicleType, InputSelector as VehicleTypeSelector } from "../../vehicle-types"
import { type Entity as Brand, InputSelector as BrandSelector } from "../../brands"
import SearchObject from "./SearchObject"

interface Emits extends /* @vue-ignore */ FilterEmits {}

const emit = defineEmits<Emits>()
const props = defineProps<{
    modelValue: SearchObject
    resultCount?: number | null
}>()

const searchObject = useVModelField<SearchObject>(props, emit)

const interventionType = ref<InterventionType>()
const interventionTypes = ref<Array<InterventionType>>()
const supplier = ref<Supplier>()
const vehicle = ref<Vehicle>()
const vehicleType = ref<VehicleType>()
const brand = ref<Brand>()

const { filterIsActive, handleUpdate, handleReset } = useFilter({ searchObject, emit, Constructor: SearchObject })
</script>
