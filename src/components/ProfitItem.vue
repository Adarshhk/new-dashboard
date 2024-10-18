<template>
    <div :class="['flex justify-between items-center p-2 my-2 rounded', color]">
      <span class="font-medium">{{ strategyDetails.name }}</span>
      <span class="font-bold">{{ brokerDetails.broker_name }}</span>
    </div>
  </template>
  
  <script setup>

import { useBrokersStore } from '../stores/matrix/broker';
import { useStrategiesStore } from '../stores/matrix/strategy';

const strategyStore = useStrategiesStore();
const brokerStore = useBrokersStore();

  const props = defineProps({
    strategy : Object,
    color : String
  })
  
  const strategyDetails = strategyStore.findStrategyById(props.strategy.strategy_id);
  const brokerDetails = brokerStore.findBrokerById(props.strategy.broker_id)
  
  </script>