<template>
    <div v-if="dashboardTree != null">
        <template v-for="node in dashboardTree.roots" :key="node.value.id">
            <DashboardContainer v-if="node.children.length" :node="node" :is-collapsed="isCollapsed" />
        </template>

        <!-- statistics is not an entity config (the nav model only supports `${key}Overview` routes), so it gets a hand-placed section -->
        <FormSection v-if="statisticsEnabled" :collapsed="statisticsCollapsed">
            <template #title>
                <h3 class="p-2 mb-2" @click="statisticsCollapsed = !statisticsCollapsed"><Icon name="statistics" class="me-1" /> {{ $t("statistics") }}</h3>
            </template>
            <div class="row">
                <div class="col-6 col-sm-4 col-md-3 col-lg-2 mb-2">
                    <div class="text-center" :title="$t('statisticsDescription')">
                        <router-link :to="{ name: 'statistics' }" class="btn btn-link pt-0 mt-0">
                            <Icon name="statistics" size="xl" />
                        </router-link>
                        <div>{{ $t("statistics") }}</div>
                    </div>
                </div>
            </div>
        </FormSection>

        <Debug :modelValue="{ tree: dashboardTree.getValues() }" />
    </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from "vue"
import { useNavigation } from "../functions"
import DashboardContainer from "./DashboardContainer.vue"

const props = defineProps<{
    isCollapsed?: boolean
}>()

const { dashboardTree } = useNavigation()

const app = getCurrentInstance()!
const statisticsEnabled = !!app.appContext.config.globalProperties.$statistics?.enabled
const statisticsCollapsed = ref(props.isCollapsed ?? false)
</script>
