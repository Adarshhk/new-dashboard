<template>
    <tr>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-black">
            {{ position.strategy_id }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-black">
            {{ position.quantity }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-black">
            {{ position.side }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-black">
            {{ position.created_at.slice(0,10)}}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <button :id="key" @click="handleArrow" class="text-teal-600 hover:text-teal-900">
              <ChevronRightIcon v-if="!arrowButton" class="h-5 w-5" />
              <ChevronDownIcon v-else class="h-5 w-5" />
            </button>
          </td>
        </tr>
        
        <tr v-if="arrowButton" class="border-2 border-gray-800 ">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <p class="text-black opacity-50 mb-4">Broker</p>
            {{ strategies.getStrategyById(position.broker_id) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <p class="text-black opacity-50 mb-4">Buy Price</p>
            {{ position.buy_price }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <p class="text-black opacity-50 mb-4">Sell Price</p>
            {{ position.sell_price }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <p class="text-black opacity-50 mb-4">Status</p>
            {{ position.status }}
          </td>
        </tr>
</template>

<script setup>
import { ref } from 'vue';
import { ChevronRightIcon } from '@heroicons/vue/solid'
import { ChevronDownIcon } from '@heroicons/vue/solid'
import { useStrategyStore } from '../../store/strategy';

const strategies = useStrategyStore()

const props = defineProps({
    position : Object
})

const arrowButton = ref(false);

const handleArrow = () => {
    arrowButton.value = !arrowButton.value
}
const headers = ['Broker' , 'Buy Price' , 'Sell Price' , 'Status']
</script>