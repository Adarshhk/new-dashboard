<template>
  <div class="flex h-screen bg-black">
    <!-- Main content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <header class="bg-black shadow-sm">
        <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 class="text-2xl font-bold text-white">My Dashboards</h1>
        </div>
      </header>

      <!-- Main content area -->
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-black">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <!-- Welcome message and Metrics -->
          <div class="flex flex-col xl:flex-row gap-4 mb-4">
            <!-- Welcome message -->
            <div class="w-full xl:w-[45%] relative bg-[#F9A43C] rounded-lg lg:py-6 text-white xs:py-10">
              <div class="ml-6 w-2/3 mb-3">

                <h2 class=" text-2xl text-black font-bold">Hello, {{ profileData.name }}</h2>
                <p class="mt-4 text-base text-[#060606] text-opacity-55">Welcome back! Let's start your trade with the
                  best strategies by us</p>
              </div>
              <div class="absolute left-24 top-2">
                <img src="../assets/cardGradient.svg" alt="Card Gradient"
                  class="opacity-80 h object-contain"> <!-- Adjusted size and object-cover -->
              </div>
              <RouterLink to="/profile" class="ml-6 text-black hover:text-yellow-100 inline-block text-sm font-normal">
                View Profile >>
              </RouterLink>
            </div>
            <!-- Metrics Cards -->
            <div class="w-full xl:w-[55%] grid grid-cols-1 sm:grid-cols-3 gap-4">
              <MetricItem :src="userPng" title="Total Users" :value="users.length" color="#F9A43C" />
              <MetricItem :src="setting" title="Strategy" :value="strategyJoined.length" color="#F9A43C" />
              <MetricItem :src="deliveryBox" title="Total Orders" :value="orders.length" color="#F9A43C" />
            </div>
          </div>

          <!-- Today's Profit and Positions -->
          <div class="flex flex-col xl:flex-row gap-4 mb-4">
            <!-- Today's Profit -->
            <div class="bg-[#2D2D2D] shadow rounded-lg lg:w-[45%]">
              <div class="flex justify-between items-center p-4">
                <h3 class="text-xl font-bold text-white">Today's Profit</h3>
                <button
                  class=" bg-[#FFAA00] text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
                  <div class="flex align-middle">
                    <img src="../assets/images/squareoff.png" class="size-4 w-5 h-4 mr-2">
                    <span class="text-sm text-white">Square off</span>
                  </div>
                </button>
              </div>
              <hr>
              <div class="flex justify-between p-4">
                <Totalpnl />
                <img src="../assets/images/graph.png" class=" w-32 h-12">
              </div>
              <hr>

              <div class="w-full overflow-hidden bg-[#2D2D2D] lg:overflow-visible p-4">
                <ProfitItem v-for="(obj, key) in strategyJoined.slice(0, 4)" :strategy="obj"
                  :color="`bg-gradient-to-r from-[#D4D6FF] to-white`" :index="key" />

              </div>
            </div>

            <!-- Positions -->
            <div class="bg-[#2D2D2D] shadow rounded-lg lg:w-[55%]">
              <div class="flex justify-between items-center p-4">
                <h3 class="text-lg font-semibold text-white">Positions</h3>
                <RouterLink to="/position" class="text-white hover:text-teal-800 focus:outline-none focus:underline">
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
import deliveryBox from '../assets/images/DeliveryBox.png'
import setting from '../assets/images/setting.png'
import userPng from '../assets/images/User.png'

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