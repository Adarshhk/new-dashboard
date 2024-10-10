<template>
  <aside class="bg-teal-800 text-white w-64 flex flex-col h-full">
    <div class="p-4">
      <span class="text-2xl font-extrabold text-yellow-500">DASH</span>
      <span class="text-2xl font-extrabold text-white">BOARD!</span>
    </div>
    <nav class="flex-1">
      <router-link v-for="item in menuItems" :key="item.name" :to="item.to" class="block py-2.5 px-4 rounded transition duration-200 hover:bg-teal-700 hover:text-white">
        <div class="flex items-center space-x-2">
          <component :is="item.icon" class="w-5 h-5" />
          <span>{{ item.name }}</span>
        </div>
      </router-link>
    </nav>
    <div class="p-4">
      <button class="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center">
        <img src="" alt="Sourabh" class="w-6 h-6 rounded-full mr-2" />
        <span>Admin</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { HomeIcon, BriefcaseIcon, ShoppingCartIcon, CurrencyDollarIcon, UsersIcon } from '@heroicons/vue/outline'

const menuItems = [
  { name: 'Dashboards', to: '/', icon: HomeIcon },
  { name: 'Brokers', to: '/brokers', icon: BriefcaseIcon },
  { name: 'Orders', to: '/orders', icon: ShoppingCartIcon },
  { name: 'Position', to: '/position', icon: CurrencyDollarIcon },
  { name: 'Users', to: '/users', icon: UsersIcon },
]
</script>