<template>
    <div class="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div class="bg-blue-800 text-white text-center py-3 text-xl font-bold">
        {{strat.script}}
      </div>
      <div class="p-4">
        <div class="flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
          <span class="text-gray-700">{{strat.name}}</span>
        </div>
        
        <div class="h-32 bg-gray-100 mb-4 flex items-center justify-center text-gray-400">
          No Positions
        </div>
        
        <div class="flex items-center justify-between mb-2">
          <span class="text-gray-700">Total PNL: <span class="text-green-500">0.00</span></span>
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
            <span class="bg-pink-100 text-pink-800 text-xs font-semibold px-2 py-1 rounded">HIGH</span>
          </div>
        </div>
        
        <div class="text-gray-600 text-sm mb-4">
          REQUIRED CAPITAL : ₹ {{ props.strat.capital_required }} PER LOT
        </div>
        
        <div class="flex space-x-2">
          <button class="flex-1 bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
            Subscribe
          </button>
          <button class="flex-1 bg-gray-200 text-blue-800 py-2 px-4 rounded hover:bg-gray-300 transition duration-200">
            More Info
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  const props = defineProps({
    strat : Object
  })
 

  </script>