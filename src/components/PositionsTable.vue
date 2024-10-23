<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200 ">
      <hr>
      <thead class="bg-black">
        
        <tr>
          <th v-for="header in headers" :key="header" scope="col" class="px-5 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody class=" divide-y divide-gray-200">
        <TableRow v-for="(position , index) in props.positions" :key="position.id" :pos = "position" :index="index" />
      </tbody>
    </table>
  </div>
</template>

<script setup>

import TableRow from './TableRow.vue';

const props = defineProps({
  positions: Array
})

const headers = ['STRATEGY NAME', 'QTY', 'TYPE', 'DATE' , '']
</script>