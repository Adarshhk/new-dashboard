<template>
    <tr :class="index%2===0 ? 'bg-[#2D2D2D]' : 'bg-black'">
          <td class="px-4 py-4 whitespace-nowrap text-sm text-white ">
            {{ strategyDetails.name }}
          </td>
          <td class="px-4 py-4 whitespace-nowrap text-sm text-white">
            {{ props.pos.quantity }}
          </td>
          <td class="px-4 py-4 whitespace-nowrap text-sm text-white">
            {{ props.pos.side }}
          </td>
          <td class="px-4 py-4 whitespace-nowrap text-sm text-white">
            {{ props.pos.created_at.slice(0,10) }}
          </td>
          <td class="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
            <button :id="key" @click="handleArrow" class="text-white hover:text-teal-900">
              <ChevronRightIcon v-if="!arrowButton" class="h-5 w-5" />
              <ChevronDownIcon v-else class="h-5 w-5" />
            </button>
          </td>
        </tr>
        
        <tr v-if="arrowButton" class="border-dashed  border-gray-800 ">
            <td class="px-4 py-4 whitespace-nowrap text-base text-white">
            <p class="text-white opacity-50 mb-4 text-xs">Broker</p>
            {{ brokerStore.findBrokerById(props.pos.broker_id).broker_name }}
          </td>
          <td class="px-4 py-4 whitespace-nowrap text-base text-white">
            <p class="text-white opacity-50 mb-4 text-xs">Buy Price</p>
            ${{ props.pos.buy_price }}
          </td>
          <td class="px-4 py-4 whitespace-nowrap text-base text-white">
            <p class="text-white opacity-50 mb-4 text-xs">Sell Price</p>
            ${{ props.pos.sell_price }}
          </td>
          <td class="px-4 py-4 whitespace-nowrap text-sm font-extrabold text-[#ADADAD]">
            <p class="text-white opacity-50 mb-4 text-xs font-light ">Status</p>
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
    pos : Object,
    index : Number
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