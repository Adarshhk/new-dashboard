<template>
    <div :class="['flex justify-between items-center p-2 rounded', color]">
      <span class="font-medium">{{ strategy }}</span>
      <span class="font-bold">₹{{ amount }}</span>
    </div>
  </template>
  
  <script setup>
  defineProps({
    strategy: String,
    amount: String,
    color: String
  })
  </script>