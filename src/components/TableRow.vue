<template>
    <tr>
          <td class="px-4 py-4 whitespace-nowrap text-sm text-black">
            {{ strategyDetails.name }}
          </td>
          <td class="px-4 py-4 whitespace-nowrap text-sm text-black">
            {{ props.pos.quantity }}
          </td>
          <td class="px-4 py-4 whitespace-nowrap text-sm text-black">
            {{ props.pos.side }}
          </td>
          <td class="px-4 py-4 whitespace-nowrap text-sm text-black">
            {{ props.pos.created_at.slice(0,10) }}
          </td>
          <td class="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
            <button :id="key" @click="handleArrow" class="text-teal-600 hover:text-teal-900">
              <ChevronRightIcon v-if="!arrowButton" class="h-5 w-5" />
              <ChevronDownIcon v-else class="h-5 w-5" />
            </button>
          </td>
        </tr>
        
        <tr v-if="arrowButton" class="border-2 border-gray-800 ">
            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
            <p class="text-black opacity-50 mb-4">Broker</p>
            {{ brokerStore.findBrokerById(props.pos.broker_id).broker_name }}
          </td>
          <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
            <p class="text-black opacity-50 mb-4">Buy Price</p>
            {{ props.pos.buy_price }}
          </td>
          <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
            <p class="text-black opacity-50 mb-4">Sell Price</p>
            {{ props.pos.sell_price }}
          </td>
          <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
            <p class="text-black opacity-50 mb-4">Status</p>
            {{ props.pos.status }}
          </td>
        </tr>
</template>

<script setup>
import { ref } from 'vue';
import { ChevronRightIcon } from '@heroicons/vue/solid'
import { ChevronDownIcon } from '@heroicons/vue/solid'
import { useStrategiesStore } from '../stores/matrix/strategy';
import { useBrokersStore } from '../stores/matrix/broker';

const props = defineProps({
    pos : Object
})
 
const strategiesStore = useStrategiesStore();
const brokerStore = useBrokersStore();
const strategyDetails = strategiesStore.findStrategyById(props.pos.strategy_id);
const arrowButton = ref(false);

const handleArrow = () => {
    arrowButton.value = !arrowButton.value
}
const headers = ['Broker' , 'Buy Price' , 'Sell Price' , 'Status']
</script>