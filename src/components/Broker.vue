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
            <th class="px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider">Broker UserId
            </th>
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
                <img :src="getBrokerImage(broker.name)" class="w-8 h-8 mr-3 object-contain" :alt="broker.name">
                <span class="font-medium text-gray-900">{{ broker.name }}</span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ broker.userId }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ broker.tokenDate }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <label class="switch">
                <input type="checkbox" v-model="broker.active" @change="toggleActive(broker)">
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
    <Modal v-if="showBrokerModal" @close="closeBrokerModal">
      <h2 class="text-xl font-bold mb-4">{{ isEditing ? 'Edit' : 'Add' }} Broker Info</h2>
      <form @submit.prevent="submitBrokerForm">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Select Broker*</label>
            <select v-model="brokerForm.name"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
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
            <label class="block text-sm font-medium text-gray-700">Broker User Id*</label>
            <input v-model="brokerForm.userId" type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Broker Pin*</label>
            <input v-model="brokerForm.pin" type="password"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Broker Qr Key*</label>
            <input v-model="brokerForm.qrKey" type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Broker Api*</label>
            <input v-model="brokerForm.api" type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Broker Api Secret*</label>
            <input v-model="brokerForm.apiSecret" type="password"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Broker Password*</label>
            <input v-model="brokerForm.password" type="password"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required>
          </div>
          <div class="flex items-center">
            <label class="block text-sm font-medium text-gray-700 mr-2">Account Active</label>
            <label class="switch">
              <input type="checkbox" v-model="brokerForm.active">
              <span class="slider round"></span>
            </label>
          </div>
        </div>
        <div class="mt-6 flex justify-end space-x-3">
          <button type="submit"
            class="bg-[#5847f7] text-white px-4 py-2 rounded-lg hover:bg-[#4c3ed3] transition-colors duration-300">Submit</button>
          <button @click="closeBrokerModal" type="button"
            class="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-300">Close</button>
        </div>
      </form>
    </Modal>

    <!-- Orders/Positions Modal -->
    <Modal v-if="showOrdersPositionsModal" @close="closeOrdersPositionsModal">
      <h2 class="text-xl font-bold mb-4">{{ selectedBroker.name }} ({{ activeTab }})</h2>
      <div class="flex mb-4">
        <button @click="activeTab = 'Orders'"
          :class="{ 'bg-[#5847f7] text-white': activeTab === 'Orders', 'bg-gray-200': activeTab !== 'Orders' }"
          class="px-4 py-2 rounded-l-lg">Orders</button>
        <button @click="activeTab = 'Positions'"
          :class="{ 'bg-[#5847f7] text-white': activeTab === 'Positions', 'bg-gray-200': activeTab !== 'Positions' }"
          class="px-4 py-2 rounded-r-lg">Positions</button>
      </div>
      <div v-if="activeTab === 'Orders'" class="overflow-x-auto">
        <table class="min-w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TIME</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TICKER</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SIDE</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ORDER TYPE</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PRICE</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AVG PRICE</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">QTY</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="orders.length === 0">
              <td colspan="8" class="px-6 py-4 text-center text-gray-500">No orders</td>
            </tr>
            <tr v-for="order in orders" :key="order.id" class="bg-white">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ order.time }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ order.ticker }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ order.side }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ order.orderType }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ order.price }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ order.avgPrice }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ order.qty }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ order.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else-if="activeTab === 'Positions'" class="overflow-x-auto">
        <table class="min-w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SYMBOL</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">QTY</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AVG. PRICE</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LTP</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">P&L</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="positions.length === 0">
              <td colspan="5" class="px-6 py-4 text-center text-gray-500">No positions</td>
            </tr>
            <tr v-for="position in positions" :key="position.id" class="bg-white">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ position.symbol }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ position.qty }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ position.avgPrice }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ position.ltp }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ position.pnl }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import Modal from '../components/Modal.vue'
import { useBrokerStore } from "../store/broker"

const brokerStore = useBrokerStore()
const brokers = computed(() => brokerStore.getBrokers)

const showBrokerModal = ref(false)
const isEditing = ref(false)
const brokerForm = reactive({
  name: '',
  userId: '',
  pin: '',
  qrKey: '',
  api: '',
  apiSecret: '',
  password: '',
  active: false
})

const showOrdersPositionsModal = ref(false)
const selectedBroker = ref({})
const activeTab = ref('Orders')
const orders = ref([])
const positions = ref([])

const openAddBrokerModal = () => {
  isEditing.value = false
  Object.assign(brokerForm, {
    name: '',
    userId: '',
    pin: '',
    qrKey: '',
    api: '',
    apiSecret: '',
    password: '',
    active: false
  })
  showBrokerModal.value = true
}

const openEditBrokerModal = (broker) => {
  isEditing.value = true
  Object.assign(brokerForm, broker)
  showBrokerModal.value = true
}

const closeBrokerModal = () => {
  showBrokerModal.value = false
}

const submitBrokerForm = () => {
  if (isEditing.value) {
    brokerStore.updateBroker(brokerForm.id, brokerForm)
  } else {
    brokerStore.addBroker(brokerForm)
  }
  closeBrokerModal()
}

const toggleActive = (broker) => {
  brokerStore.toggleBrokerActive(broker.id)
}

const connectBroker = (broker) => {
  // Implement broker connection logic
  console.log('Connecting to broker:', broker.name)
}

const editBroker = (broker) => {
  openEditBrokerModal(broker)
}

const deleteBroker = (brokerId) => {
  if (confirm('Are you sure you want to delete this broker?')) {
    brokerStore.deleteBroker(brokerId)
  }
}

const openOrdersPositionsModal = (broker) => {
  selectedBroker.value = broker
  showOrdersPositionsModal.value = true
  // Fetch orders and positions data for the selected broker
  orders.value = brokerStore.getOrders(broker.id)
  positions.value = brokerStore.getPositions(broker.id)
}

const closeOrdersPositionsModal = () => {
  showOrdersPositionsModal.value = false
}

const getBrokerImage = (brokerName) => {
  const imageMap = {
    'Angel': '/src/assets/images/Angel.png',
    'IIFL': '/src/assets/images/IIFL.png',
    'Zerodha': '/src/assets/images/Zerodha.png',
    'Aliceblue': '/src/assets/images/Aliceblue.png',
    'Dhan': '/src/assets/images/Dhan.png',
    'Matrade': '/src/assets/images/Matrade.png',
    'Shoonya': '/src/assets/images/Shoonya.png'
  };

  return imageMap[brokerName]

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