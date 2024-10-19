<template>
    <div class="bg-[#1c5a5a] min-h-screen flex items-center justify-center">
        <div class="border-2 border-yellow-500 rounded px-8 py-10 mb-4 w-full max-w-md">
            <h2 class="text-3xl font-bold text-center text-yellow-500 mb-8">Forgot Password</h2>
            <form @submit.prevent="handleSubmit">
                <!-- Email Input -->
                <div class="mb-4">
                    <label class="block text-white text-md font-bold mb-2" for="email">
                        Email Address
                    </label>
                    <input
                        v-model="formData.email"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <!-- password Input -->
                <div class="mb-4">
                    <label class="block text-white text-md font-bold mb-2" for="password">
                        New Password
                    </label>
                    <input
                        v-model="formData.password"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"
                        id="password"
                        type="password"
                        placeholder="Enter New Password"
                        required
                    />
                </div>

                <!-- Send OTP Button -->
                <div class="mb-4">
                    <button
                        @click="sendOtp"
                        class="bg-yellow-300 hover:bg-yellow-500 text-[#1c5a5a] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                        Send OTP
                    </button>
                </div>

                <!-- OTP Input -->
                <div class="mb-4">
                    <label class="block text-white text-md font-bold mb-2" for="otp">
                        OTP
                    </label>
                    <input
                        v-model="otp"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"
                        id="otp"
                        type="text"
                        placeholder="Enter OTP"
                    />
                </div>

                <!-- Submit Button -->
                <div class="flex items-center justify-between mb-10">
                    <button
                        class="bg-yellow-300 hover:bg-yellow-500 text-[#1c5a5a] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        @click="verifyOtp">
                        Submit
                    </button>
                </div>

                <p v-if="errorMessage" class="text-red-500 text-xs italic mt-4">{{ errorMessage }}</p>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { makeRequest } from '../request/request';
import { reactive } from 'vue';

const formData = reactive({
    email : "",
    password : "",
})

const otp = ref("");

const router = useRouter();

const sendOtp = async () => {
  try {
      const response = await makeRequest('sendForgotOTP', 'POST', {email: forgotEmail.value}, {}, {},0) 
      if(response) {
        error.value = "";
        forOtpVerify.value = true
        otpData.email = forgotEmail.value
      } else{
        error.value = state["sendForgotOTP"].error.data.message;
      }
  } catch (error) {
    error.value = state["sendForgotOTP"].error.message;
  }
}

const verifyOtp = async () => {
    try {
      validateOtp.value.$touch();
      if (!validateOtp.value.$invalid) {
          const response = await makeRequest('forgot', 'PUT', otp, {}, {},0) 

          if(response) {
            error.value = "";
            forOtpVerify.value = false
            forgotPassword.value = false
            router.push({ name: 'login' })
            showToast("Password changed successfully", "success")
          } else {
            error.value = state["forgot"].error.data.message;
          }
      } 
  } catch (error) {
    error.value = state["forgot"].error.message;
    if (error.value) {
      error.value = state["forgot"].error.data.message;
    }
  }
}



</script>

<style scoped>
/* Add any custom styling here if needed */
</style>
