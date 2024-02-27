<template>
  <section>
    <h1 class="text-center">
      {{ homeTitle }}
    </h1>

    HOME
  </section>
</template>

<script setup lang="ts">
import appConfig from '@/app-config'

const { title: homeTitle } = appConfig
</script>
