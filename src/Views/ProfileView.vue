<template>
    <div class="profile-page bg-[#ebf5ff] min-h-screen p-8">
      <div class="max-w-6xl mx-auto">
        <div class="pt-2 mb-2">
        <span class="text-3xl font-extrabold text-[#115e59]">Profile</span>
      </div>
      <div class="bg-[#115e59] rounded-lg shadow-md p-6  top-8 xs:block sm:hidden">
              <h3 class="text-xl font-semibold text-yellow-500 mb-4">Quote of the Day</h3>
              <p class="text-white italic">
                {{profileData.quote_of_the_day}}
              </p>
            </div>
        
        <div class="bg-[#115e59] rounded-lg shadow-md p-6 mb-8 mt-4">
          <div class="flex items-center mb-6">
            <img src="/dummy.jpeg" alt="Profile Picture" class="w-24 h-24 rounded-full mr-6 object-cover" />
            <div>
              <h2 class="text-2xl font-semibold text-yellow-500">Welcome <span>{{ profileData.name }}</span></h2>
              <p class="text-white">{{profileData.user_role}}</p>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="text-lg font-semibold text-yellow-500 mb-2">Contact Details</h3>
              <p class="text-white">{{profileData.email}}</p>
              <p class="text-white">{{profileData.mobile}}</p>
            </div>
          </div>
        </div>
  
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="col-span-2">
            <div class="bg-[#115e59] rounded-lg shadow-md p-6 mb-8">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-semibold text-yellow-500">Profile</h3>
                <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">Edit</button>
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium text-white mb-1">Name</label>
                <input type="text" :value="profileData.name" class="w-full p-2 bg-[#177e77] text-white rounded-md" readonly />
              </div>
              <div>
                <label class="block text-sm font-medium text-white mb-1">Change Profile Picture</label>
                <div class="flex items-center">
                  <label class="cursor-pointer bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors">
                    Choose File
                    <input type="file" class="hidden" />
                  </label>
                  <span class="ml-3 text-sm text-gray-500">No file chosen</span>
                </div>
              </div>
            </div>
  
            <div class="bg-[#115e59] rounded-lg shadow-md p-6 mb-8">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-semibold text-yellow-500">Social</h3>
                <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">Edit</button>
              </div>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-white mb-1">Tradingview ID</label>
                  <input type="text" class="w-full p-2 bg-[#177e77] text-white rounded-md" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-white mb-1">Telegram API</label>
                  <input type="text" class="w-full p-2 bg-[#177e77] text-white rounded-md" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-white mb-1">Telegram Chat ID</label>
                  <input type="text" class="w-full p-2 bg-[#177e77] text-white rounded-md" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-white mb-1">Status</label>
                  <input type="text" class="w-full p-2 bg-[#177e77] text-white rounded-md" />
                </div>
              </div>
            </div>
  
            <div class="bg-[#115e59] rounded-lg shadow-md p-6 mb-8">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-semibold text-yellow-500">Billing</h3>
                <button class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">Create Invoice</button>
              </div>
              <p class="text-white">Record not found!!</p>
            </div>
  
            <div class="bg-[#115e59] rounded-lg shadow-md p-6 mb-8">
              <h3 class="text-xl font-semibold text-yellow-500 mb-4">Change Password</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-white mb-1">Current Password</label>
                  <input type="password" class="w-full p-2 bg-[#177e77] text-white rounded-md" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-white mb-1">New Password</label>
                  <input type="password" class="w-full p-2 bg-[#177e77] text-white rounded-md" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-white mb-1">Confirm Password</label>
                  <input type="password" class="w-full p-2 bg-[#177e77] text-white rounded-md" />
                </div>
                <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">Submit</button>
              </div>
            </div>
          </div>
  
          <div class="col-span-1 ">
            <div class="bg-[#115e59] rounded-lg shadow-md p-6 sticky top-8 xs:hidden sm:block">
              <h3 class="text-xl font-semibold text-yellow-500 mb-4">Quote of the Day</h3>
              <p class="text-white italic">
                "Success is not final, failure is not fatal: It is the courage to continue that counts." - Winston Churchill
              </p>
            </div>
          </div>
          
        </div>
      </div>
      
    </div>
  </template>
  
  <script setup>
import { useRoute, useRouter } from 'vue-router';
import { useProfileStore } from '../stores/matrix/profile';
import { onMounted, ref } from 'vue';
const profileStore = useProfileStore();
const profileData = ref({})
onMounted(()=> {

  profileData.value = profileStore.profile;
})
    
  </script>
  