<template>
  <div class="broker-page p-6">
    <div class="flex justify-between items-center mb-6">
      <div class="pt-2 mb-2">
        <span class="text-3xl font-extrabold text-[#115e59]">Brokers</span>
      </div>
      <button @click="openAddBrokerModal"
        class="bg-[#5847f7] text-white px-4 py-2 rounded-lg hover:bg-[#4c3ed3] transition-colors duration-300">
        Add New Broker
      </button>
    </div>
    <span class="my-4 font-semibold">{{ brokers.length }} Brokers Connected</span>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full">
        <thead class="bg-yellow-500">
          <tr>
            <th class="px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider">Broker</th>
            <th class="px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider">Broker UserId</th>
            <th class="px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider">Token Date</th>
            <th class="px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider">Active</th>
            <th class="px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider">Connect</th>
            <th class="px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider">ACTIONS</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="broker in brokers" :key="broker.id" :class="{ 'bg-gray-50': broker.id % 2 === 0 }">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <img :src="getBrokerImage(broker.broker_name)" class="w-8 h-8 mr-3 object-contain" :alt="broker.broker_name">
                <span class="font-medium text-gray-900">{{ broker.broker_name }}</span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ broker.broker_userid }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ broker.broker_token_date }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <label class="switch">
                <input type="checkbox" v-model="broker.is_active" @change="toggleActive(broker)">
                <span class="slider round"></span>
              </label>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button @click="connectBroker(broker)" class="text-[#5847f7] hover:underline">Connect</button>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button @click="editBroker(broker)" class="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
              <button @click="openOrdersPositionsModal(broker)"
                class="text-green-600 hover:text-green-900 mr-2">Orders/Positions</button>
              <button @click="deleteBroker(broker.id)" class="text-red-600 hover:text-red-900">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Broker Modal -->
    <div v-if="showAddEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden">
        <div class="p-6 bg-gray-50 border-b border-gray-200">
          <h2 class="text-2xl font-bold text-gray-800">{{ editBrokerData.id ? 'Edit' : 'Add' }} Broker Info</h2>
        </div>
        <form @submit.prevent="submitBrokerForm" class="p-6">
          <div class="grid grid-cols-2 gap-6">
            <div>
              <label for="broker-name" class="block text-sm font-medium text-gray-700 mb-1">Select Broker*</label>
              <select v-model="editBrokerData.broker_name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                <option value="">Select a broker</option>
                <option value="Aliceblue">Aliceblue</option>
                <option value="Angel">Angel</option>
                <option value="Dhan">Dhan</option>
                <option value="IIFL">IIFL</option>
                <option value="Matrade">Matrade</option>
                <option value="Shoonya">Shoonya</option>
                <option value="Zerodha">Zerodha</option>
              </select>
            </div>
            <div>
              <label for="broker-userid" class="block text-sm font-medium text-gray-700 mb-1">Broker User Id*</label>
              <input
                id="broker-userid"
                v-model="editBrokerData.broker_userid"
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              >
            </div>
            <div>
              <label for="broker-pin" class="block text-sm font-medium text-gray-700 mb-1">Broker Pin*</label>
              <input
                id="broker-pin"
                v-model="editBrokerData.broker_pin"
                type="password"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              >
            </div>
            <div>
              <label for="broker-qrkey" class="block text-sm font-medium text-gray-700 mb-1">Broker Qr Key*</label>
              <input
                id="broker-qrkey"
                v-model="editBrokerData.broker_qr_key"
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              >
            </div>
            <div>
              <label for="broker-api" class="block text-sm font-medium text-gray-700 mb-1">Broker Api*</label>
              <input
                id="broker-api"
                v-model="editBrokerData.broker_api"
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              >
            </div>
            <div>
              <label for="broker-apisecret" class="block text-sm font-medium text-gray-700 mb-1">Broker Api Secret*</label>
              <input
                id="broker-apisecret"
                v-model="editBrokerData.broker_api_secret"
                type="password"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              >
            </div>
            <div>
              <label for="broker-password" class="block text-sm font-medium text-gray-700 mb-1">Broker Password*</label>
              <input
                id="broker-password"
                v-model="editBrokerData.broker_password"
                type="password"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              >
            </div>
            <div class="flex items-center">
              <label for="broker-active" class="block text-sm font-medium text-gray-700 mr-3">Account Active</label>
              <label class="relative inline-flex items-center cursor-pointer">
                <input id="broker-active" type="checkbox" v-model="editBrokerData.is_active" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
          <div class="mt-8 flex justify-end space-x-4">
            <button
              @click="closeAddEditModal"
              type="button"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {{ editBrokerData.id ? 'Update' : 'Add' }} Broker
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Orders/Positions Modal -->
    <div v-if="showOrderPositionModal" class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-2">
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-3xl">
        <div class="p-4">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-bold text-gray-800">{{ showBrokerName }} ({{ activeTab }})</h2>
            <button @click="closeOrdersPositionsModal" class="text-gray-500 hover:text-gray-700 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="flex mb-4">
            <button @click="activeTab = 'Orders'"
              :class="{ 'bg-[#5847f7] text-white': activeTab === 'Orders', 'bg-gray-100 text-gray-700': activeTab !== 'Orders' }"
              class="px-4 py-2 rounded-l-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#5847f7] focus:ring-opacity-50">
              Orders
            </button>
            <button @click="activeTab = 'Positions'"
              :class="{ 'bg-[#5847f7] text-white': activeTab === 'Positions', 'bg-gray-100 text-gray-700': activeTab !== 'Positions' }"
              class="px-4 py-2 rounded-r-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#5847f7] focus:ring-opacity-50">
              Positions
            </button>
          </div>
          <div v-if="activeTab === 'Orders'" class="overflow-x-auto">
            <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead class="bg-gray-50">
                <tr>
                  <th v-for="header in ['TIME', 'TICKER', 'SIDE', 'ORDER TYPE', 'PRICE', 'AVG PRICE', 'QTY', 'STATUS']" :key="header"
                      class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {{ header }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-if="brokerOrders.length === 0">
                  <td colspan="8" class="px-4 py-2 text-center text-gray-500">No orders</td>
                </tr>
                <tr v-for="order in brokerOrders" :key="order.id" class="hover:bg-gray-50 transition-colors duration-200">
                  <td v-for="field in ['time', 'ticker', 'side', 'orderType', 'price', 'avgPrice', 'qty', 'status']" :key="field"
                      class="px-4 py-2 whitespace-nowrap text-sm" :class="field === 'ticker' ? 'text-gray-900 font-medium' : 'text-gray-500'">
                    {{ order[field] }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else-if="activeTab === 'Positions'" class="overflow-x-auto">
            <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead class="bg-gray-50">
                <tr>
                  <th v-for="header in ['SYMBOL', 'QTY', 'AVG. PRICE', 'LTP', 'P&L']" :key="header"
                      class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {{ header }}
                  </th>
                </tr>
              
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-if="brokerPositions.length === 0">
                  <td colspan="5" class="px-4 py-2 text-center text-gray-500">No positions</td>
                </tr>
                <tr v-for="position in brokerPositions" :key="position.id" class="hover:bg-gray-50 transition-colors duration-200">
                  <td v-for="field in ['symbol', 'qty', 'avgPrice', 'ltp', 'pnl']" :key="field"
                      class="px-4 py-2 whitespace-nowrap text-sm" :class="field === 'symbol' ? 'text-gray-900 font-medium' : 'text-gray-500'">
                    {{ position[field] }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useBrokersStore } from '../stores/matrix/broker'

const brokerStore = useBrokersStore()
const brokers = computed(() => brokerStore.brokers)
const activeTab = ref('Orders')

onMounted(() => {
  brokerStore.getBrokers()
})

const openAddBrokerModal = () => {
  brokerStore.editBrokerData = {}
  brokerStore.showAddEditModal = true
}

const closeAddEditModal = () => {
  brokerStore.showAddEditModal = false
}

const submitBrokerForm = () => {
  brokerStore.addEditBroker(brokerStore.editBrokerData.id, brokerStore.editBrokerData)
  closeAddEditModal()
}

const toggleActive = (broker) => {
  broker.is_active = !broker.is_active
  brokerStore.addEditBroker(broker.id, broker)
}

const connectBroker = (broker) => {
  // Implement broker connection logic
  console.log('Connecting to broker:', broker.broker_name)
}

const editBroker = (broker) => {
  brokerStore.editBrokerData = { ...broker }
  brokerStore.showAddEditModal = true
}

const deleteBroker = (brokerId) => {
  if (confirm('Are you sure you want to delete this broker?')) {
    brokerStore.deleteBroker(brokerId)
  }
}

const openOrdersPositionsModal = async (broker) => {
  brokerStore.showOrderPositionModal = true
  await brokerStore.showOrdersview(broker)
}

const closeOrdersPositionsModal = () => {
  brokerStore.showOrderPositionModal = false
}

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
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
}

input:checked+.slider {
  background-color: #115e59;
}

input:checked+.slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>