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
            <th scope="col" v-for="header in headers" :key="header" class="px-4 py-2 text-left text-xs font-bold text-black uppercase tracking-wider"> <!-- Reduced padding -->
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50">
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{{ order.created_at.slice(0,10)}}</td> <!-- Reduced padding and fixed date slicing -->
            <td class="px-4 py-2 whitespace-nowrap">
              <div class="flex items-center">
                <img :src="getBrokerImage(brokerStore.getBrokersById(order.broker_id)?.broker_name || 'Unknown Broker')" class="w-5 h-5 mr-2 rounded-full" :alt="order.broker_id">
                <span class="text-sm text-gray-900">{{ brokerStore.getBrokersById(order.broker_id)?.broker_name || 'Unknown Broker' }}</span>
              </div>
            </td>
            <td class="px-4 py-2 whitespace-nowrap">
              <div class="flex items-center">
                <span class="text-sm text-gray-900">{{ strategyStore.findStrategyById(order.strategy_id).name }}</span>
              </div>
            </td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{{ order.tradingsymbol }}</td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{{ order.quantity }}</td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{{ order.buy_price }}</td>
            <td class="px-4 py-2 whitespace-nowrap">
              <span :class="getStatusClass(order.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                {{ order.status }}
              </span>
            </td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{{ order.product }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useOrdersStore } from '../stores/matrix/order'
import { useBrokersStore } from '../stores/matrix/broker';
import { useStrategiesStore } from '../stores/matrix/strategy';

const orderStore = useOrdersStore()
const brokerStore = useBrokersStore();
const strategyStore = useStrategiesStore();

const orders = ref([]) // Ref for reactive data
const headers = ['Time', 'Broker', 'Strategy', 'Script', 'Quantity', 'Price', 'Status', 'Product Type']

onMounted(async () => {
  
  orders.value = orderStore.orders
  console.log(orders.value) // Debugging purposes
})

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
  const imageName = imageMap[brokerName?.split(' ')[0]] || 'default.png'; // Default fallback image
  return new URL(`../assets/images/${imageName}`, import.meta.url).href;
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
  return statusClasses[status.split(' ')[0]] || 'bg-gray-100 text-gray-800'; // Fallback for unknown status
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
