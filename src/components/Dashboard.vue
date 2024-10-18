<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Main content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <header class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 class="text-2xl font-semibold text-gray-900">My Dashboards</h1>
        </div>
      </header>

      <!-- Main content area -->
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <!-- Welcome message and Metrics -->
          <div class="flex flex-col xl:flex-row gap-6 mb-6">
            <!-- Welcome message -->
            <div class="w-full xl:w-1/2 bg-teal-600 rounded-lg p-6 text-white">
              <h2 class="text-2xl font-bold">Hello, {{ profileData.name }}</h2>
              <p class="mt-1 text-teal-100">Welcome back! Let's start your trade with the best strategies by us</p>
              <RouterLink to="/profile" class="text-yellow-300 hover:text-yellow-100 mt-2 inline-block">View Profile >>
              </RouterLink>
            </div>
            <!-- Metrics Cards -->
            <div class="w-full xl:w-1/2 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <MetricItem title="Total Users" :value="users.length" icon="UserGroupIcon" accentColor="indigo"
                iconColor="indigo" />
              <MetricItem title="Strategy" :value="strategyJoined.length" icon="CogIcon" accentColor="red"
                iconColor="red" />
              <MetricItem title="Total Orders" :value="orders.length" icon="CubeIcon" accentColor="green"
                iconColor="green" />
            </div>
          </div>

          <!-- Today's Profit and Positions -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Today's Profit -->
            <div class="bg-white shadow rounded-lg p-6 h-96">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold text-gray-900">Today's Profit</h3>
                <button
                  class="bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">Square
                  off</button>
              </div>
              <Totalpnl />
              <div class="w-full overflow-auto h-64 ">
                <ProfitItem v-for="obj in strategyJoined" :strategy="obj"
                  :color="`bg-gradient-to-r from-yellow-400 to-white`" />

              </div>
            </div>

            <!-- Positions -->
            <div class="bg-white shadow rounded-lg p-6">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold text-gray-900">Positions</h3>
                <RouterLink to="/position" class="text-teal-600 hover:text-teal-800 focus:outline-none focus:underline">
                  See all</RouterLink>
              </div>
              <PositionsTable :positions="positions" />
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import ProfitItem from './ProfitItem.vue'
import PositionsTable from './PositionsTable.vue'
import MetricItem from './MetricItem.vue'
import { RouterLink } from 'vue-router'
import { useProfileStore } from '../stores/matrix/profile'
import { useStrategiesStore } from '../stores/matrix/strategy'
import { useOrdersStore } from '../stores/matrix/order'
import { useUsersStore } from '../stores/matrix/users'

import Totalpnl from './Totalpnl.vue'
import { usePositionsStore } from '../stores/matrix/position'

const profileStore = useProfileStore();
const strategyStore = useStrategiesStore();
const orderStore = useOrdersStore();
const userStore = useUsersStore();
const positionStore = usePositionsStore();

const strategyJoined = ref([]);
const positions = ref([]);
const orders = ref([]);
const profileData = ref([]);
const users = ref([]);
onMounted(() => {
  strategyJoined.value = strategyStore.stratgyJoinedPlans
  positions.value = positionStore.positions;
  orders.value = orderStore.orders
  profileData.value = profileStore.profile;
  users.value = userStore.users;
})



</script>