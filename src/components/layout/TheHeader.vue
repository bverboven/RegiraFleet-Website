<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light">
    <div class="container-md">
      <router-link
        class="navbar-brand"
        :to="{ name: 'home' }"
        :title="'Fleet Manager v ' + version"
        >Fleet Manager</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click.stop="showNavBarContent = !showNavBarContent"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse"
        :class="{ show: showNavBarContent }"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item d-none">
            <router-link
              class="nav-link"
              aria-current="page"
              :to="{ name: 'home' }"
              :title="'Fleet Manager v ' + version"
              >Fleet Manager</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'booking-list' }">Boekingen</router-link>
          </li>
          <li class="nav-item dropdown" v-if="isAdmin">
            <a
              class="nav-link dropdown-toggle"
              :class="{ disabled: !isAdmin }"
              @click.stop.prevent="showNavbarManagementDropdown = !showNavbarManagementDropdown"
              href="#"
              id="navbarManagementDropdown"
              role="button"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              Algemeen bestandsbeheer
            </a>
            <ul
              class="dropdown-menu"
              :class="{ show: showNavbarManagementDropdown }"
              aria-labelledby="navbarManagementDropdown"
            >
              <li>
                <router-link class="dropdown-item" :to="{ name: 'carTypes' }"
                  >Wagen Types</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" :to="{ name: 'supplierTypes' }"
                  >Leverancier Types</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" :to="{ name: 'interventionTypes' }"
                  >Interventie Types</router-link
                >
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <router-link class="dropdown-item" :to="{ name: 'brands' }">Merken</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" :to="{ name: 'cars' }">Wagens</router-link>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <router-link class="dropdown-item" :to="{ name: 'suppliers' }"
                  >Leveranciers</router-link
                >
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              @click.stop.prevent="showNavbarStatisticsDropdown = !showNavbarStatisticsDropdown"
              href="#"
              id="navbarStatistiekenDropdown"
              role="button"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              Statistieken
            </a>
            <ul
              class="dropdown-menu"
              :class="{ show: showNavbarStatisticsDropdown }"
              aria-labelledby="navbarStatistiekenDropdown"
            >
              <li>
                <router-link class="dropdown-item" :to="{ name: 'stats-per-car' }"
                  >Totalen per wagen</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" :to="{ name: 'stats-per-carType' }"
                  >Totalen per wagentype</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" :to="{ name: 'stats-per-car-per-type' }"
                  >Totalen per wagen &amp; wagentype</router-link
                >
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <router-link class="dropdown-item" :to="{ name: 'stats-per-intervention' }"
                  >Totalen per interventietype</router-link
                >
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  :to="{ name: 'stats-per-intervention-and-carType' }"
                >
                  Totalen per interventietype &amp; wagentype
                </router-link>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <router-link class="dropdown-item" :to="{ name: 'stats-per-supplier' }"
                  >Totalen per leverancier</router-link
                >
              </li>
            </ul>
          </li>
        </ul>
        <div class="d-flex">
          <!-- floating right content -->
          <template v-if="$isAuthenticated">LOG OUT</template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useConfig } from '@/app-config'

const { version } = useConfig()

const isAdmin = computed(() => console.debug('toDo:isAdmin'))

const showNavBarContent = ref(false)
const showNavbarManagementDropdown = ref(false)
const showNavbarStatisticsDropdown = ref(false)

document.addEventListener('click', () => {
  showNavBarContent.value = false
  showNavbarManagementDropdown.value = false
  showNavbarStatisticsDropdown.value = false
})
</script>
