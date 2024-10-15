<template>
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <slot></slot>
        </div>
        <div class="items-center px-4 py-3">
          <button @click="$emit('close')" class="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-300">
            Close
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineEmits(['close'])
  </script>