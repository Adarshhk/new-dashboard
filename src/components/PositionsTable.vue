<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200 ">
      <thead class="bg-gray-50">
        <tr>
          <th v-for="header in headers" :key="header" scope="col" class="px-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <TableRow v-for="position in positions" :position = "position"/>
      </tbody>
    </table>
  </div>
</template>

<script setup>

import { reactive } from 'vue';
import TableRow from './TableRow.vue';

const props = defineProps({
  positions: Array
})
const arrowButton = reactive({
  1 : false,
  2 : false,
  3 : false,
  4: false,
  5: false,
});

const handleArrow = (key) => {
 arrowButton[key] = !arrowButton[key]
}
const headers = ['STRATEGY NAME', 'QTY', 'TYPE', 'TIME']
</script>