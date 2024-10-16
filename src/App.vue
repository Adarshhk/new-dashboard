<template>
    <RouterView/>
  </template>
  
  <script setup>
import { onMounted } from 'vue';
import { userStore } from './store/profile';
import { RouterView } from 'vue-router';
const profile = userStore();
  const userData = profile.mockData;

onMounted(() => {
  
  if(localStorage.getItem("authToken") != null) userData.status="Success"
})
  </script>
  
  <style>
  /* Optional: You can add styling here for your main content */
  </style>
  