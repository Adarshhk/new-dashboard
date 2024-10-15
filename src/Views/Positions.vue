<template>
  <div class="positions-page p-6">
    <div class="pt-2 mb-2">
        <span class="text-3xl font-extrabold text-[#115e59]">Positions</span>
      </div>
    <div class="flex justify-between items-center mb-4">
      <p class="text-lg">Today's Profit: <span :class="{'text-green-600': todayProfit > 0, 'text-red-600': todayProfit < 0}">{{ formatCurrency(todayProfit) }}</span></p>
      <p class="my-4 font-semibold">{{ positions.length }} Total Positions</p>
    </div>
    
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white">
        <thead class="bg-yellow-500">
          <tr>
            <th v-for="header in headers" :key="header" class="py-2 px-4 text-left">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="position in positions" :key="position.id" class="border-b">
            <td class="py-2 px-4">
              <div class="flex items-center">
                <component :is="getStrategyIcon(position.strategy)" class="w-5 h-5 mr-2" />
                {{ position.strategy }}
              </div>
            </td>
            <td class="py-2 px-4">
              <div class="flex items-center">
                <img :src="getBrokerImage(position.broker)" class="w-5 h-5 mr-2" :alt="position.broker">
                {{ position.broker }}
              </div>
            </td>
            <td class="py-2 px-4">{{ position.script }}</td>
            <td class="py-2 px-4">{{ position.product }}</td>
            <td class="py-2 px-4">{{ position.side }}</td>
            <td class="py-2 px-4">{{ position.quantity }}</td>
            <td class="py-2 px-4">{{ position.buyPrice }}</td>
            <td class="py-2 px-4">{{ position.sellPrice }}</td>
            <td class="py-2 px-4">
              <span :class="getStatusClass(position.status)">
                {{ position.status }}
              </span>
            </td>
            <td class="py-2 px-4" :class="{'text-green-600': position.pnl > 0, 'text-red-600': position.pnl < 0}">
              {{ formatCurrency(position.pnl) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { CubeIcon } from '@heroicons/vue/solid'
import  {usePositionStore}  from '../store/positions';

const positionStore = usePositionStore()
const positions = ref([])
const headers = ['Strategy', 'Broker', 'Script', 'Product', 'Side', 'Quantity', 'Buy Price', 'Sell Price', 'Position Status', 'P&L']

onMounted(async () => {
  await positionStore.fetchPositions()
  positions.value = positionStore.positions
})

const todayProfit = computed(() => {
  return positions.value.reduce((total, position) => total + position.pnl, 0)
})

const getBrokerImage = (brokerName) => {
  const imageMap = {
    'Angel': 'Angel.png',
    'IIFL': 'IIFL.png',
    'Zerodha': 'Zerodha.png',
    'Aliceblue': 'Aliceblue.png',
    'Dhan': 'Dhan.png',
    'Matrade': 'Matrade.png',
    'Shoonya': 'Shoonya.png'
  };
  const imageName = imageMap[brokerName.split(' ')[0]] || `${brokerName.toLowerCase()}.png`;
  return new URL(`../assets/images/${imageName}`, import.meta.url).href;
}

const getStrategyIcon = (strategy) => {
  return CubeIcon
}

const getStatusClass = (status) => {
  const statusClasses = {
    'CLOSED': 'text-gray-600',
    'OPEN': 'text-blue-600',
    'CLOSING': 'text-yellow-600'
  }
  return statusClasses[status] || ''
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value)
}
</script>

<style scoped>
/* Add any additional styles here */
</style>