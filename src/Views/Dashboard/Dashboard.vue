<template>
  <div class="flex h-screen bg-gray-100">
   

    <!-- Main content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <header class="bg-white shadow-sm z-10">
        <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 class="text-2xl font-semibold text-gray-900">My Dashboards</h1>
        </div>
      </header>

      <!-- Main content area -->
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <!-- Welcome message and Metrics -->
          <div class="flex flex-col md:flex-row gap-6 mb-6">
            <!-- Welcome message -->
            <div class="md:w-1/2 bg-teal-600 rounded-lg p-6 text-white">
              <h2 class="text-2xl font-bold">Hello,{{ user.name }}</h2>
              <p class="mt-1 text-teal-100">Welcome back! Let's Start your trade with a best strategies by us</p>
              <a href="#" class="text-yellow-300 hover:text-yellow-100 mt-2 inline-block">View Profile >></a>
            </div>
            <!-- Metrics Cards -->
            <div class="md:w-1/2 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <MetricItem title="Total Brokers" :value="totalBrokers" icon="UserGroupIcon" accentColor="indigo" iconColor="indigo" />
              <MetricItem title="Strategy" :value="12" icon="CogIcon" accentColor="red" iconColor="red" />
              <MetricItem title="Total Orders" :value="totalOrderCount" icon="CubeIcon" accentColor="green" iconColor="green" />
            </div>
          </div>

          <!-- Today's Profit and Positions -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
            <!-- Today's Profit -->
            <div class="bg-white shadow rounded-lg p-6">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold text-gray-900">Today's Profit</h3>
                <button class="bg-teal-600 text-white px-3 py-1 rounded">Square off</button>
              </div>
              <div class="text-3xl  font-bold text-gray-900 mb-4">
                <TotalProfit/>
              </div>
              
            </div>

            <!-- Positions -->
            <div class="bg-white shadow rounded-lg p-6">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold text-gray-900">Positions</h3>
                <a href="#" class="text-teal-600 hover:text-teal-800">See all</a>
              </div>
              <PositionsTable :positions="positionArray" />
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
  
  <script setup>
  import { ref } from 'vue'
  import ProfitItem from './ProfitItem.vue'
  import PositionsTable from './PositionsTable.vue'
  import MetricItem from './MetricItem.vue'


import { positionStore } from '../../store/position'
import { profileStore } from '../../store/profile'
import { brokerStore } from '../../store/brokers'
import { useStrategyStore } from '../../store/strategy'
import { orderStore } from '../../store/order'
import TotalProfit from '../../components/TotalProfit.vue'


  
  const positionArray = positionStore().getPositions;
  const user = profileStore()
  const totalBrokers = brokerStore().getTotalBrokers;
  const totalStrategyJoined = useStrategyStore().getStrategiesCnt;
  const totalOrderCount = orderStore().getOrdersCount;

  // const profit = useProfitStore();
  // const profitArray = profit.strategies;
  </script>

