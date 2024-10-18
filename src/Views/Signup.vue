<template>
  <div class="bg-[#1c5a5a] min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="border-2 border-yellow-500 rounded-lg px-4 py-8 sm:px-8 sm:py-10 w-full max-w-md">
      <h2 class="text-2xl sm:text-3xl font-bold text-center text-yellow-500 mb-8 sm:mb-12">Sign Up</h2>
      <form @submit.prevent="handleSignup" class="space-y-6">
        <div>
          <label class="block text-white text-sm font-bold mb-2" for="username">
            Username
          </label>
          <input
            v-model="username"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Enter your username"
            required
          />
        </div>

        <div>
          <label class="block text-white text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input
            v-model="email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label class="block text-white text-sm font-bold mb-2" for="phone">
            Phone Number
          </label>
          <input
            v-model="phone"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div>
          <label class="block text-white text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input
            v-model="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <div>
          <label class="block text-white text-sm font-bold mb-2" for="confirm-password">
            Confirm Password
          </label>
          <input
            v-model="confirmPassword"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confirm-password"
            type="password"
            placeholder="Confirm your password"
            required
          />
        </div>

        <div>
          <p class="text-red-500 text-sm" v-if="errorMessage">{{ errorMessage }}</p>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <button
            class="w-full sm:w-auto bg-yellow-300 hover:bg-yellow-500 text-[#1c5a5a] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
            type="submit"
          >
            Sign Up
          </button>

          <p class="text-sm text-white">
            Already have an account?
            <span 
              class="underline cursor-pointer hover:text-yellow-300 transition duration-300 ease-in-out" 
              @click="redirectToLogin"
            >
              Log in
            </span>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const username = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const router = useRouter();


const handleSignup = () => {

  // Basic validation
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match';
    return;
  }

  localStorage.setItem('authToken', '1234');

  router.push('/');
};

const redirectToLogin = () => {
  router.push('/login');
};
</script>