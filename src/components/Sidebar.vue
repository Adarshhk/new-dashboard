<template>
  <div class="relative z-10">
    <div class="fixed">
      <!-- Hamburger menu for mobile -->
      <button @click="toggleSidebar"
        class="lg:hidden fixed top-4 left-3/4 z-20 xs:ml-10 md:ml-32 bg-[#1C5A5A] text-white p-2 rounded-md hover:bg-[#497B7B] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        aria-label="Toggle sidebar">
        <img src="../assets/hamburger.svg"v-if="!isSidebarOpen" class="w-6 h-6" />
        <img src="../assets/x.svg" v-else class="w-6 h-6" />
      </button>

      <!-- Sidebar -->
      <aside :class="{
        'translate-x-0': isSidebarOpen,
        '-translate-x-full': !isSidebarOpen,
        'lg:translate-x-0': true
      }"
        class="fixed top-0 left-0 z-10 h-screen w-64 bg-black text-white transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0">
        <div class="p-4 xs:mt-11 sm:mt-0">
          <!-- <h1 class="text-2xl font-extrabold">
            <span class="text-yellow-500">DASH</span>
            <span class="text-white">BOARD!</span>
          </h1> -->
          <img src="../assets/logo.svg" alt="">
        </div>

        <!-- Sidebar navigation items -->
        <nav class="mt-6">
          <router-link v-for="item in menuItems" :key="item.name" :to="item.to"
            class="border-b-2 border-[#2D2D2D] flex items-center px-4 py-2.5 text-sm font-medium transition-colors duration-200 hover:bg-[#F9A43C] hover:text-white"
            :class="{'bg-[#F9A43C]' : item.name === activeRoute}"
              @click="toggleRoute(item.name)">

            <img :src="item.icon" class="size-8 mr-6" />
            <span class="font-extralight text-base">{{ item.name }}</span>
            
          </router-link>
        </nav>

        <!-- Admin Profile Section -->
        
        <div class="absolute bottom-0 left-0 right-0 p-4">
          <hr class="text-[#2D2D2D]">
          <div class="relative">
            <button @click="toggleAdminDropdown"
              class="flex items-center w-full bg-black hover:bg-[#F9A43C] text-white font-medium py-2 px-4 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
              <img src="/image.png" alt="Admin" class="w-8 h-8 rounded-full mr-3" />
              <span>{{ profileStore.profile.name }}</span>
              <ChevronDownIcon :class="{ 'transform rotate-180': isAdminDropdownOpen }"
                class="w-5 h-5 ml-auto transition-transform duration-200" />
            </button>
            <div v-if="isAdminDropdownOpen"
              class="absolute bottom-full left-0 w-full bg-teal-700 rounded-t-md shadow-lg overflow-hidden transition-all duration-200 ease-in-out">
              <router-link to="/profile"
                class="block px-4 py-2 text-sm text-white hover:bg-teal-600 transition-colors duration-200"
                @click="closeAdminDropdown">
                Profile
              </router-link>
              <button @click="handleLogout"
                class="w-full text-left px-4 py-2 text-sm text-white hover:bg-teal-600 transition-colors duration-200">
                Logout
              </button>
            </div>
          </div>
        </div>
      </aside>

      <!-- Overlay for mobile -->
      <div v-if="isSidebarOpen" @click="closeSidebar" class="fixed inset-0 bg-black bg-opacity-50 z-5 lg:hidden"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProfileStore } from '../stores/matrix/profile';
import homenav from '../assets/images/homenav.png'
import usernav from '../assets/images/usernav.png'
import positionnav from '../assets/images/positionnav.png'
import ordersnav from '../assets/images/ordersnav.png'
import borkernav from '../assets/images/brokernav.png'


const profileStore = useProfileStore();

const activeRoute = ref("")

const menuItems = [
  { name: 'Dashboards', to: '/', icon: homenav},
  { name: 'Brokers', to: '/brokers', icon: borkernav },
  { name: 'Orders', to: '/orders', icon: ordersnav },
  { name: 'Position', to: '/position', icon: positionnav },
  { name: 'My Strategy', to: '/my-strategy', icon: usernav },
]

const router = useRouter()
const isSidebarOpen = ref(false)
const isAdminDropdownOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}

const toggleAdminDropdown = () => {
  isAdminDropdownOpen.value = !isAdminDropdownOpen.value
}

const closeAdminDropdown = () => {
  isAdminDropdownOpen.value = false
}

const toggleRoute = (btn) => {
  activeRoute.value = btn;
  if (window.innerWidth < 1024) {
    closeSidebar()
  }
}

const handleLogout = () => {
  
  localStorage.clear()
  router.push("/login")
}
</script>

<style scoped>
/* Add any additional custom styles here if needed */
</style>

