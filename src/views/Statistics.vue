<template>
  <article>
    <div class="container-md">
      <h1 class="text-nowrap">{{ pageTitle }}</h1>
    </div>

    <router-view></router-view>

    <div class="container-md">
      <div class="list-group mt-2" v-show="showList">
        <router-link
          class="list-group-item list-group-item-action"
          :to="{ name: 'stats-per-carType' }"
          >Totalen per wagentype per maand</router-link
        >
        <router-link class="list-group-item list-group-item-action" :to="{ name: 'stats-per-car' }"
          >Totalen per wagen per maand</router-link
        >
        <router-link
          class="list-group-item list-group-item-action"
          :to="{ name: 'stats-per-intervention' }"
          >Totalen per interventietype</router-link
        >
        <router-link
          class="list-group-item list-group-item-action"
          :to="{ name: 'stats-per-supplier' }"
          >Totalen per leverancier</router-link
        >
        <router-link
          class="list-group-item list-group-item-action"
          :to="{ name: 'stats-per-intervention-and-carType' }"
        >
          Totalen per interventietype + wagentype
        </router-link>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showList = computed(() => router.currentRoute.value.name === 'statistics')
const pageTitle = computed(
  () => (router.currentRoute.value.meta && router.currentRoute.value.meta.title) || 'Statistieken'
)
</script>
