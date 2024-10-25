<template>
  <div class="positions-page p-6">
    <div class="pt-2 mb-2">
        <span class="text-3xl font-extrabold text-[#115e59]">Positions</span>
      </div>
    <div class="flex justify-between items-center mb-4">
      <span class="text-lg">Today's Profit: </span>
      <Totalpnl/>
      <p class="my-4 font-semibold">4 Total Positions</p>
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
                
                {{ strategyStore.findStrategyById(position.strategy_id).name }}
              </div>
            </td>
            <td class="py-2 px-4">
              <div class="flex items-center">
                <img :src="getBrokerImage(brokerStore.getBrokersById(position.broker_id)?.broker_name)" class="w-5 h-5 mr-2" :alt="position.broker_id">
                {{ brokerStore.getBrokersById(position.broker_id)?.broker_name }}
              </div>
            </td>
            <td class="py-2 px-4">{{ position.tradingsymbol }}</td>
            <td class="py-2 px-4">{{ position.product }}</td>
            <td class="py-2 px-4">{{ position.side }}</td>
            <td class="py-2 px-4">{{ position.quantity }}</td>
            <td class="py-2 px-4">{{ position.buy_price }}</td>
            <td class="py-2 px-4">{{ position.sell_price }}</td>
            <td class="py-2 px-4">
              <span :class="getStatusClass(position.status)">
                {{ position.status }}
              </span>
            </td>
            <td class="py-2 px-4">
              0
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
import { usePositionsStore } from '../stores/matrix/position';
import Totalpnl from '../components/Totalpnl.vue';
import { useBrokersStore } from '../stores/matrix/broker';
import { useStrategiesStore } from '../stores/matrix/strategy';

const positionStore = usePositionsStore();
const brokerStore = useBrokersStore();
const strategyStore = useStrategiesStore();
const positions = ref([]);


onMounted(() => {
  positions.value = positionStore.positions;
  
})


const headers = ['Strategy', 'Broker', 'Script', 'Product', 'Side', 'Quantity', 'Buy Price', 'Sell Price', 'Position Status', 'P&L']

const getBrokerImage = (brokerName) => {
  const imageMap = {
    'angel': 'Angel.png',
    'iifl': 'IIFL.png',
    'zerodha': 'Zerodha.png',
    'aliceblue': 'Aliceblue.png',
    'dhan': 'Dhan.png',
    'matrade': 'Matrade.png',
    'shoonya': 'Shoonya.png'
  };
  const imageName = imageMap[brokerName?.split(' ')[0]] || `${brokerName?.toLowerCase()}.png`;
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