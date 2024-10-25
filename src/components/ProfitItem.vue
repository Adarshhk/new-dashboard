<template>
    <div class="bg-[#2D2D2D] flex justify-between items-center p-2 my-4 rounded-md border-2 border-opacity-20 border-gray-500">
      <span class="font-medium text-white text-sm">{{ strategyDetails.name }}</span>
      <span class="font-bold text-[#F9A43C]">{{ brokerDetails.broker_name }}</span>
    </div>
  </template>
  
  <script setup>

import { useBrokersStore } from '../stores/matrix/broker';
import { useStrategiesStore } from '../stores/matrix/strategy';

const strategyStore = useStrategiesStore();
const brokerStore = useBrokersStore();

  const props = defineProps({
    strategy : Object,
    index: Number
  })
  console.log(props.index)

  const colors = ["bg-gradient-to-r from-[#D4D6FF] to-white" , "bg-gradient-to-r from-[#D4FFD8] to-white" , "bg-gradient-to-r from-[#FFF3D4] to-white" , "bg-gradient-to-r from-[#D4FFD8] to-white" , "bg-gradient-to-r from-[#D4D6FF] to-white" ]
  
  const strategyDetails = strategyStore.findStrategyById(props.strategy.strategy_id);
  const brokerDetails = brokerStore.findBrokerById(props.strategy.broker_id)
  
  </script>