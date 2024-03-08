<template>
    <form class="row row-cols-lg-auto align-items-center">
        <div class="col"><input type="number" v-model="filter.year" class="form-control" /></div>
        <div class="col"><button type="button" class="btn btn-info">Submit</button></div>
    </form>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import useStatisticsStore from "./store"

const { filter } = storeToRefs(useStatisticsStore())
</script>
