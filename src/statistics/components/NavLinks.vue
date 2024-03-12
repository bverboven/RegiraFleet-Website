<template>
    <ul class="nav nav-pills">
        <li class="nav-item">
            <router-link class="nav-link py-1" :to="{ name: 'stats-per-vehicle' }" :title="$t('vehicle')"><Icon :name="Vehicle.name" /></router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link py-1" :to="{ name: 'stats-per-vehicleType' }" :title="$t('vehicleType')"><Icon :name="VehicleType.name" /></router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link py-1" :to="{ name: 'stats-per-vehicle-per-type' }" :title="`${$t('vehicle')} + ${$t('vehicleType')}`"
                ><Icon :name="Vehicle.name" />+<Icon :name="VehicleType.name"
            /></router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link py-1" :to="{ name: 'stats-per-interventionType' }" :title="$t('interventionType')"><Icon :name="InterventionType.name" /></router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link py-1" :to="{ name: 'stats-per-supplier' }" :title="$t('supplier')"><Icon :name="Supplier.name" /></router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link py-1" :to="{ name: 'stats-per-interventionType-and-vehicleType' }" :title="`${$t('interventionType')} + ${$t('vehicleType')}`"
                ><Icon :name="InterventionType.name" />+<Icon :name="VehicleType.name"
            /></router-link>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { Entity as Vehicle } from "@/entities/vehicles"
import { Entity as VehicleType } from "@/entities/vehicle-types"
import { Entity as Supplier } from "@/entities/intervention-operators"
import { Entity as InterventionType } from "@/entities/intervention-types"
</script>
