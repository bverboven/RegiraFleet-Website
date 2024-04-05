<template>
    <LoadingContainer :is-loading="isLoading">
        <div class="table-responsive">
            <template v-if="stats != null">
                <table v-if="stats.length" class="table table-striped">
                    <thead>
                        <tr>
                            <th class="text-end" v-for="(header, i) in stats[0]" :key="i">{{ header }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(r, i) in stats.slice(1)" :key="i">
                            <td class="text-nowrap text-end" v-for="(c, j) in r" :key="j">{{ j > 0 && isCurrency(c) ? formatCurrency(c) : c }}</td>
                        </tr>
                    </tbody>
                </table>
                <template v-if="stats.length == 0">
                    <slot name="no-data">
                        <div class="container-md">
                            <p class="text-muted" v-show="!isLoading && !errorMsg && !stats[0].length">Geen data gevonden</p>
                        </div>
                    </slot>
                </template>
            </template>
            <slot name="info"></slot>
            <slot name="error">
                <div class="container-md">
                    <p class="bg-danger text-white py-2 px-3" v-if="errorMsg">{{ errorMsg }}</p>
                </div>
            </slot>
        </div>
    </LoadingContainer>
</template>

<script setup lang="ts">
import { LoadingContainer } from "@/regira_modules/vue/ui"

withDefaults(
    defineProps<{
        stats?: Array<[]>
        isLoading: boolean
        errorMsg?: string
    }>(),
    {
        isLoading: false,
    }
)

function isCurrency(c: string) {
    return c && parseFloat(c) > 0
}
function formatCurrency(c: string) {
    return isCurrency(c) ? parseFloat(c).toLocaleString("nl-BE", { style: "currency", currency: "EUR" }) : c
}
</script>

<style scoped>
tr:last-of-type {
    font-weight: bold;
}
</style>
