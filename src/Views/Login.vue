<template>
    <div class="bg-[#1c5a5a] min-h-screen flex items-center justify-center">
        <div class=" border-yellow-500 border-2 rounded-md px-8 py-10 mb-4 w-full max-w-md">
            <h2 class="text-3xl font-bold text-center text-yellow-500 mb-20">Login</h2>
            <form @submit.prevent="handleSubmit">
                <div class="mb-4">
                    <label class="block text-white text-md font-bold mb-2" for="email">
                        Email
                    </label>
                    <input v-model="email"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"
                        id="email" type="email" placeholder="Enter your email" required />
                </div>

                <div class="mb-2">
                    <label class="block text-white text-md font-bold mb-2" for="password">
                        Password
                    </label>
                    <input v-model="password"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password" type="password" placeholder="Enter your password" required />
                </div>

                <div class="mb-10">
                    <RouterLink to="/forgot-password">

                        <p class="text-sm text-white underline cursor-pointer ">Forgot Password?</p>
                    </RouterLink>
                </div>

                <div class="flex items-center justify-between">
                    <button
                        class="bg-yellow-300 hover:bg-yellow-500 text-[#1c5a5a] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Login
                    </button>

                    <div>
                        <RouterLink to="/signup">

                            <p class="text-sm text-white underline cursor-pointer">Create an account here</p>
                        </RouterLink>
                    </div>
                </div>
            </form>

            <p v-if="errorMessage" class="text-red-500 text-xs italic mt-4">{{ errorMessage }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { userStore } from '../store/profile';
const profile = userStore();
const userData = profile.mockData;
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();
const handleSubmit = () => {
    if (email.value === '' || password.value === '') {
        errorMessage.value = 'Please fill in both fields';
        return;
    }
    userData.data.email = email;
    
    localStorage.setItem("authToken", "1234");
    router.push("/")
    userData.status = "Success";
};
</script>

<style scoped>
/* You can add custom styles here if necessary */
</style>