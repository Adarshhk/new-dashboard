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
                        v-model="email"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <!-- Contact Input -->
                <div class="mb-4">
                    <label class="block text-white text-md font-bold mb-2" for="contact">
                        Phone Number
                    </label>
                    <input
                        v-model="contact"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"
                        id="contact"
                        type="text"
                        placeholder="Enter your contact number"
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
                        type="submit">
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

const email = ref('');
const contact = ref('');
const otp = ref('');
const errorMessage = ref('');
const router = useRouter();

const sendOtp = () => {
    if (!email.value || !contact.value) {
        errorMessage.value = 'Please fill in both email and contact number.';
        return;
    }
    // Simulate sending OTP
    console.log('OTP sent to', email.value, contact.value);
    errorMessage.value = ''; // Clear error message after successful OTP send
};

const handleSubmit = () => {
    if (!email.value || !contact.value || !otp.value) {
        errorMessage.value = 'Please fill in all fields before submitting.';
        return;
    }

    // Simulate OTP verification and password reset process
    console.log('OTP submitted successfully');
    localStorage.setItem("authToken", "5678");
    router.push("/"); // Redirect to the homepage or a reset password page
};
</script>

<style scoped>
/* Add any custom styling here if needed */
</style>
