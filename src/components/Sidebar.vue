<template>
  <div>
    <!-- Hamburger menu for mobile -->
    <button @click="toggleSidebar" class="lg:hidden fixed top-4 left-4 z-20 bg-teal-800 text-white p-2 rounded-md">
      <MenuIcon v-if="!isSidebarOpen" class="w-6 h-6" />
      <XIcon v-else class="w-6 h-6" />
    </button>

    <!-- Sidebar -->
    <aside
      :class="{
        'translate-x-0': isSidebarOpen,
        '-translate-x-full': !isSidebarOpen,
        'lg:translate-x-0': true
      }"
      class="bg-teal-800 text-white w-64 flex flex-col h-screen fixed left-0 top-0 z-10 transition-transform duration-300 ease-in-out lg:relative"
    >
      <div class="p-4">
        <span class="text-2xl font-extrabold text-yellow-500">DASH</span>
        <span class="text-2xl font-extrabold text-white">BOARD!</span>
      </div>
      <nav class="flex-1 overflow-y-auto">
        <router-link
          v-for="item in menuItems"
          :key="item.name"
          :to="item.to"
          class="block py-2.5 px-4 rounded transition duration-200 hover:bg-teal-700 hover:text-white"
          @click="closeSidebarOnMobile"
        >
          <div class="flex items-center space-x-2">
            <component :is="item.icon" class="w-5 h-5" />
            <span>{{ item.name }}</span>
          </div>
        </router-link>
      </nav>
      <div class="p-4 xs:mb-24">
        <button class="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center">
          <img src="" alt="Sourabh" class="w-6 h-6 rounded-full mr-2" />
          <span>Admin</span>
        </button>
      </div>
    </aside>

    <!-- Overlay for mobile -->
    <div
      v-if="isSidebarOpen"
      @click="closeSidebar"
      class="fixed inset-0 bg-black bg-opacity-50 z-5 lg:hidden"
    ></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { HomeIcon, BriefcaseIcon, ShoppingCartIcon, CurrencyDollarIcon, MenuIcon, XIcon } from '@heroicons/vue/outline'

const menuItems = [
  { name: 'Dashboards', to: '/', icon: HomeIcon },
  { name: 'Brokers', to: '/brokers', icon: BriefcaseIcon },
  { name: 'Orders', to: '/orders', icon: ShoppingCartIcon },
  { name: 'Position', to: '/position', icon: CurrencyDollarIcon },
  { name: 'Strategies', to: '/strategies', icon: CurrencyDollarIcon },
  { name: 'My Strategy', to: '/my-strategy', icon: CurrencyDollarIcon },
]

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}

const closeSidebarOnMobile = () => {
  if (window.innerWidth < 1024) {
    closeSidebar()
  }
}
</script>

<style scoped>
@media (max-width: 1023px) {
  .translate-x-0 {
    transform: translateX(0);
  }
  .-translate-x-full {
    transform: translateX(-100%);
  }
}
</style>