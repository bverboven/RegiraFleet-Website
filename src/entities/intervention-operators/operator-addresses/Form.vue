<template>
    <div style="min-height: 40vh">
        <div class="row">
            <div class="col-md mb-2">
                <CountrySelector v-model="country" v-model:idValue="item.countryCode" :readonly="readonly" :auto-select="true" />
                <FormLabel label="country" />
            </div>
        </div>
        <div class="row">
            <div class="col-md-4 mb-2">
                <input v-model.trim="item.postalCode" maxlength="256" :readonly="readonly" class="form-control" placeholder="zip" autocomplete="__away" />
                <FormLabel label="Postal code" />
            </div>
            <div class="col mb-2">
                <input v-model.trim="item.city" maxlength="256" :readonly="readonly" class="form-control" placeholder="city" autocomplete="__away" />
                <FormLabel label="City, municipality" />
            </div>
        </div>
        <div class="row">
            <div class="col-md mb-2">
                <div class="input-group">
                    <input v-model.trim="item.street" maxlength="256" :readonly="readonly" class="form-control" placeholder="street" autocomplete="__away" />
                </div>
                <FormLabel label="Street" />
            </div>
            <div class="col-md-2 mb-2">
                <input v-model.trim="item.number" maxlength="256" :readonly="readonly" class="form-control" placeholder="nr" autocomplete="__away" />
                <FormLabel label="Street nr" />
            </div>
            <div class="col-md-2 mb-2">
                <input v-model.trim="item.box" maxlength="256" :readonly="readonly" class="form-control" placeholder="box" autocomplete="__away" />
                <FormLabel label="Box nr" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useVModelField } from "@/regira_modules/vue/vue-helper"
import { type Entity as Country, InputSelector as CountrySelector } from "../../countries"
import type Entity from "./Entity"

const emit = defineEmits<{
    (e: "update:modelValue", item: Entity): void
}>()
const props = defineProps<{
    modelValue: Entity
    readonly?: boolean
}>()

const item = useVModelField<Entity>(props, emit)
const country = ref<Country>()
</script>
