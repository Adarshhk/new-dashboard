<template>
  <div class="order-page p-4 sm:p-6 lg:p-8">
    <div class="pt-2 mb-2">
      <span class="text-3xl font-extrabold text-[#115e59]">Orders</span>
    </div>
    <span class="my-4 font-semibold">{{ orders.length }} Total Orders</span>
    
    <div class="overflow-x-auto bg-white rounded-lg shadow"> <!-- Centered table container -->
      <table class="min-w-full divide-y divide-gray-200 compact-table"> <!-- Added compact-table class -->
        <thead class="bg-yellow-500">
          <tr>
            <th v-for="header in headers" :key="header" class="px-4 py-2 text-left text-xs font-bold text-black uppercase tracking-wider"> <!-- Reduced padding -->
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50">
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{{ order.time }}</td> <!-- Reduced padding -->
            <td class="px-4 py-2 whitespace-nowrap">
              <div class="flex items-center">
                <img :src="getBrokerImage(order.img)" class="w-5 h-5 mr-2 rounded-full" :alt="order.broker">
                <span class="text-sm text-gray-900">{{ order.broker }}</span>
              </div>
            </td>
            <td class="px-4 py-2 whitespace-nowrap">
              <div class="flex items-center">
                <component :is="getStrategyIcon(order.strategy)" class="w-5 h-5 mr-2 text-gray-500" />
                <span class="text-sm text-gray-900">{{ order.strategy }}</span>
              </div>
            </td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{{ order.script }}</td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{{ order.quantity }}</td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{{ order.price }}</td>
            <td class="px-4 py-2 whitespace-nowrap">
              <span :class="getStatusClass(order.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                {{ order.status }}
              </span>
            </td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{{ order.productType }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { CubeIcon, ChartBarIcon } from '@heroicons/vue/solid'
import { useOrdersStore } from '../stores/matrix/order'

const orderStore = useOrdersStore()
const orders = ref([])
const headers = ['Time', 'Broker', 'Strategy', 'Script', 'Quantity', 'Price', 'Status', 'Product Type']

onMounted(async () => {
 
  orders.value = orderStore.orders
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
  const imageName = imageMap[brokerName.split(' ')[0]] || 'default.png';
  return new URL(`../assets/images/${imageName}`, import.meta.url).href;
}

const getStrategyIcon = (strategy) => {
  return strategy.includes('DOMAIN') ? CubeIcon : ChartBarIcon
}

const getStatusClass = (status) => {
  const statusClasses = {
    'REJECTED': 'bg-red-100 text-red-800',
    'COMPLETE': 'bg-green-100 text-green-800',
    'SUCCESS': 'bg-green-100 text-green-800',
    'OPEN': 'bg-blue-100 text-blue-800',
    'PENDING': 'bg-yellow-100 text-yellow-800',
    'CLOSE': 'bg-gray-100 text-gray-800'
  }
  return statusClasses[status.split(' ')[0]] || 'bg-gray-100 text-gray-800'
}
</script>

<style scoped>
.order-page {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.compact-table {
  width: 100%; /* Full width but controlled */
  max-width: 900px; /* Max-width to limit table size */
  font-size: 14px; /* Slightly smaller font */
}

th, td {
  padding: 0.5rem 0.75rem; /* Reduced padding for compact design */
}

/* Responsive adjustments for smaller screens */
@media (max-width: 640px) {
  .order-page {
    font-size: 14px;
  }

  .compact-table {
    font-size: 12px; /* Smaller font size for mobile */
  }

  th, td {
    padding: 0.25rem 0.5rem; /* Reduced padding for mobile */
  }

  .whitespace-nowrap {
    white-space: normal; /* Text wrapping on small screens */
  }
}
</style>
