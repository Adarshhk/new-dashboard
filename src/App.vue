<template>
    <div class="flex h-screen">
      <!-- Sidebar -->
      <Sidebar/>
  
      <!-- Main content -->
      <div class="flex-1 bg-gray-100 xs:mt-16">
        <router-view />
      </div>
    </div>
  </template>
  
  <script setup>
import Sidebar from './components/Sidebar.vue';


  </script>
  
  <style>
  /* Optional: You can add styling here for your main content */
  </style>
  