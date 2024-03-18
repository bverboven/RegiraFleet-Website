<template>
    <div>
        <div class="row">
            <div class="col-sm mb-2">
                <div class="input-group">
                    <div class="input-group-text"><Icon name="invoice" /></div>
                    <input v-model="item.invoiceNumber" required :readonly="readonly" class="form-control" />
                </div>
                <FormLabel :label="$t('invoiceNumber')" />
            </div>
            <div class="col-sm mb-2">
                <div class="input-group">
                    <div class="input-group-text">
                        <Icon name="date" />
                    </div>
                    <DateInput v-model="item.invoiceDate" :disabled="readonly" :culture="$culture" class="form-control" />
                </div>
                <FormLabel :label="$t('invoiceDate')" />
            </div>
        </div>
        <div class="row">
            <div class="col-sm mb-2">
                <div class="input-group">
                    <div class="input-group-text"><Icon name="euro" /></div>
                    <input type="number" v-model="item.priceExcl" step="any" :readonly="readonly" class="form-control" />
                </div>
                <FormLabel :label="$t('priceExcl')" />
            </div>
            <div class="col-sm mb-2">
                <select v-model="item.taxCategory" :disabled="readonly" class="form-select">
                    <option :value="TaxCategory.Deductible">Deductible</option>
                    <option :value="TaxCategory.NotDeductible">Not Deductible</option>
                    <option :value="TaxCategory.Mixed">Mixed</option>
                </select>
                <FormLabel :label="$t('taxCategory')" />
            </div>
        </div>
        <div class="row">
            <DescriptionInput v-model="item.description" :readonly="readonly" :label="$t('notes')" />
        </div>
        <Debug
            :modelValue="{
                item,
            }"
        />
    </div>
</template>

<script setup lang="ts">
import { useVModelField } from "@/regira_modules/vue/vue-helper"
import Entity from "./Entity"
import { TaxCategory } from "./TaxCategory"

const emit = defineEmits<{
    (e: "update:modelValue", value: Entity): void
}>()
const props = defineProps<{
    modelValue: Entity
    readonly?: boolean
}>()

const item = useVModelField<Entity>(props, emit)
</script>
