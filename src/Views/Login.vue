<template>
    <div class="bg-[#1c5a5a] min-h-screen flex items-center justify-center">
        <div class=" border-yellow-500 border-2 rounded-md px-8 py-10 mb-4 w-full max-w-md">
            <h2 class="text-3xl font-bold text-center text-yellow-500 mb-20">Login</h2>
            <form >
                <div class="mb-4">
                    <label class="block text-white text-md font-bold mb-2" for="email">
                        Email
                    </label>
                    <input v-model="signinData.email"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"
                        id="email" type="email" placeholder="Enter your email" required />
                </div>

                <div class="mb-2">
                    <label class="block text-white text-md font-bold mb-2" for="password">
                        Password
                    </label>
                    <input v-model="signinData.password"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password" type="password" placeholder="Enter your password" required />
                </div>

                <div class="mb-10">
                    <RouterLink to="/forgot-password">

                        <p class="text-sm text-white underline cursor-pointer ">Forgot Password?</p>
                    </RouterLink>
                </div>

                <div class="flex items-center justify-between">
                    <button @click="login"
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
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const signinData = reactive({
    email : "",
    password : ""
})
const errorMessage = ref('');
const router = useRouter();
const login = async () => {
  try {
    validateSignin.value.$touch();
    if (!validateSignin.value.$invalid) {
      const response = await makeRequest('login', 'POST', signinData)
      
      if (response) {
        let token = response.data.access_token
        setToken(token);

        setisAuthenticated(true,response.data.role_name);
        localStorage.setItem("role", response.data.role_name);

        localStorage.setItem("token", token);
        localStorage.setItem("refresh", 'true');
        router.push({ name: 'dashboard' })
        
        error.value = "";
      } else {
        error.value = state["login"].error.data.message;
      }
    }
  } catch (error) {
    error.value = state["login"].error.message;
    if (error.value) {
      error.value = state["login"].error.data.message;
    }
  }
}
</script>

<style scoped>
/* You can add custom styles here if necessary */
</style>