<template>
  <div class="strategy-page p-6">
    <div class="pt-2 mb-2">
      <span class="text-3xl font-extrabold text-[#115e59]">My strategies</span>
    </div>
    <span class="my-4 font-semibold">{{ strategies.length }} Total Strategies</span>
    
    <div class="overflow-x-auto">
      <table class="min-w-full">
        <thead class="bg-yellow-500">
          <tr>
            <th class="py-2 px-4 text-left">Strategy</th>
            <th class="py-2 px-4 text-left hidden sm:table-cell">Broker</th>
            <th class="py-2 px-4 text-left hidden sm:table-cell">Lot Size</th>
            <th class="py-2 px-4 text-left hidden md:table-cell">ReEntry</th>
            <th class="py-2 px-4 text-left hidden lg:table-cell">ReEntry Triggered</th>
            <th class="py-2 px-4 text-left hidden lg:table-cell">Active</th>
            <th class="py-2 px-4 text-left hidden xl:table-cell">Joined At</th>
            <th class="py-2 px-4 text-left">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="strategy in strategies" :key="strategy.id" class="border-b">
            <td class="py-2 px-4">
              <div class="flex items-center">
                <!-- <component :is="getStrategyIcon(strategy.name)" class="w-5 h-5 mr-2" /> -->
                {{ strategiesStore.findStrategyById(strategy.strategy_id).name }}
              </div>
            </td>
            <td class="py-2 px-4 hidden sm:table-cell">
              <div class="flex items-center">
                <img :src="getBrokerImage(brokerStore.findBrokerById(strategy.broker_id).broker_name)" class="size-6" alt="" />
                   &nbsp; {{brokerStore.findBrokerById(strategy.broker_id).broker_name }}
              </div>
            </td>
            <td class="py-2 px-4 hidden sm:table-cell">{{ strategy.lots }}</td>
            <td class="py-2 px-4 hidden md:table-cell">{{ strategy.re_entry }}</td>
            <td class="py-2 px-4 hidden lg:table-cell">{{ strategy.re_entry_triggered }}</td>
            <td class="py-2 px-4 hidden lg:table-cell">
              <label class="switch">
                <input type="checkbox" v-model="strategy.is_active" @change="toggleActive(strategy)">
                <span class="slider round"></span>
              </label>
            </td>
            <td class="py-2 px-4 hidden xl:table-cell">{{ strategy.created_at.slice(0,10) }}</td>
            <td class="py-2 px-4">
              <button @click="editStrategy(strategy)" class="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
              <button @click="deleteStrategy(strategy.id)" class="text-red-600 hover:text-red-800">Delete</button>
              <button @click="showDetails(strategy)" class="text-green-600 hover:text-green-800 lg:hidden"> Details</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3 text-center">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Edit Joiner Info</h3>
          <div class="mt-2 px-7 py-3">
            <div class="mb-4">
              <label class="block text-black text-sm font-bold mb-2" for="lotSize">
                Lot Size
              </label>
              <input v-model="editingStrategy.lotSize" id="lotSize" type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div class="mb-4">
              <label class="block text-black text-sm font-bold mb-2" for="reEntry">
                Re Entry
              </label>
              <input v-model="editingStrategy.reEntry" id="reEntry" type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div class="mb-4">
              <label class="block text-black text-sm font-bold mb-2" for="status">
                Status
              </label>
              <select v-model="editingStrategy.active" id="status" class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline">
                <option :value="true">Active</option>
                <option :value="false">Inactive</option>
              </select>
            </div>
          </div>
          <div class="items-center px-4 py-3">
            <button class="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
              Submit
            </button>
          </div>
          <div class="items-center px-4 py-3">
            <button @click="closeModal" class="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-300">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Details Modal -->
    <div v-if="showDetailsModal" class="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full flex items-center justify-center" id="details-modal">
      <div class="relative bg-white w-full max-w-md mx-auto rounded-lg shadow-xl transition-all transform duration-300 ease-in-out" :class="{ 'opacity-0 scale-95': !showDetailsModal, 'opacity-100 scale-100': showDetailsModal }">
        <div class="p-6">
          <h3 class="text-2xl font-semibold text-gray-900 mb-4">Strategy Details</h3>
          <div class="space-y-4">
            <div v-for="(value, key) in selectedStrategy" :key="key" class="flex items-center border-b border-gray-200 pb-2">
              <span class="text-sm font-medium text-gray-500 w-1/3">{{ key.charAt(0).toUpperCase() + key.slice(1) }}:</span>
              <span class="text-sm text-gray-900 w-2/3">{{ formatValue(key, value) }}</span>
            </div>
          </div>
          <div class="mt-6">
            <button @click="closeDetailsModal" class="w-full px-4 py-2 bg-indigo-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ChartBarIcon } from '@heroicons/vue/solid'
import { useStrategiesStore } from '../stores/matrix/strategy'
import { useBrokersStore } from '../stores/matrix/broker';

const strategiesStore = useStrategiesStore()
const strategies = ref([])
const showModal = ref(false)
const showDetailsModal = ref(false)
const editingStrategy = ref({})
const selectedStrategy = ref({})
const brokerStore = useBrokersStore();

onMounted(async () => {
    strategies.value = strategiesStore.stratgyJoinedPlans;
})

const getStrategyIcon = (name) => {
  return name.includes('DOMAIN RANGE BREAKOUT') ? ChartBarIcon : ChartBarIcon
}

const getBrokerImage = (brokerName) => {
  const imageMap = {
    'angel': 'Angel',
    'iifl': 'IIFL',
    'zerodha': 'Zerodha',
    'aliceblue': 'Aliceblue',
    'dhan': 'Dhan',
    'mhtrade': 'Matrade',
    'shoonya': 'Shoonya'
  };
  const formattedName = imageMap[brokerName.toLowerCase()] || brokerName;
  return new URL(`../assets/images/${formattedName}.png`, import.meta.url).href;
}

// const toggleActive = (strategy) => {
//   strategyStore.updateStrategy(strategy.id, { active: strategy.active })
// }

const editStrategy = (strategy) => {
  editingStrategy.value = { ...strategy }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

// const saveEditedStrategy = () => {
//   strategyStore.updateStrategy(editingStrategy.value.id, editingStrategy.value)
//   closeModal()
// }

// const deleteStrategy = (id) => {
//   if (confirm('Are you sure you want to delete this strategy?')) {
//     strategyStore.deleteStrategy(id)
//   }
// }

const showDetails = (strategy) => {
  selectedStrategy.value = { ...strategy }
  showDetailsModal.value = true
}

const closeDetailsModal = () => {
  showDetailsModal.value = false
}

const formatValue = (key, value) => {
  if (key === 'active') return value ? 'Yes' : 'No'
  if (key === 'joinedAt') return new Date(value).toLocaleDateString()
  return value
}
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
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
  height: 15px;
  width: 15px;
  left: 4px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:checked + .slider:before {
  transform: translateX(20px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>