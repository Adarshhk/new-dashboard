<template>
  <div class="strategy-page p-6">
  <div class="pt-2 mb-6">
      <p class="text-3xl font-extrabold text-[#115e59]">Strategies</p>
      <p class="my-4 font-semibold">{{ strategies.length }} Total Strategies</p>
  </div>
    
  <div class=" flex flex-wrap gap-5">

    <StrategyCard v-for="strategy in strategies" :strat = strategy />

  </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ChartBarIcon } from '@heroicons/vue/solid'
import { useStrategiesStore } from '../stores/matrix/strategy';
import StrategyCard from '../components/StrategyCard.vue'


const strategyStore = useStrategiesStore()
const strategies = ref([])
const showModal = ref(false)
const showDetailsModal = ref(false)
const editingStrategy = ref({})
const selectedStrategy = ref({})

onMounted(async () => {
  strategies.value = strategyStore.strategies
 
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

const toggleActive = (strategy) => {
  strategyStore.updateStrategy(strategy.id, { active: strategy.active })
}

const editStrategy = (strategy) => {
  editingStrategy.value = { ...strategy }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const saveEditedStrategy = () => {
  strategyStore.updateStrategy(editingStrategy.value.id, editingStrategy.value)
  closeModal()
}

const deleteStrategy = (id) => {
  if (confirm('Are you sure you want to delete this strategy?')) {
    strategyStore.deleteStrategy(id)
  }
}

const showDetails = (strategy) => {
  selectedStrategy.value = { ...strategy }
  showDetailsModal.value = true
}

const closeDetailsModal = () => {
  showDetailsModal.value = false
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
  background-color: #2196F3;
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