<template>
  <div class="bg-[url('/public/login.jpg')] h-screen grid grid-cols-2">
    <div class="col-span-1 xs:hidden md:block">
      <div class="bg-white rounded-lg w-3/4 h-4/5 mx-auto mt-20">

<div class="ml-12">
  
    <h1 class=" mt-24 text-3xl font-bold text-black typing-animation">Welcome To <span
      class="text-yellow-500">Dashboard</span></h1>
  <p class=" text-lg font-semibold text-yellow-500">
    Amazing Portfolio Management Work Is <span class="text-black font-bold">Waiting For You!</span>
  </p>
</div>

<div class="mx-auto mt-12 size-[26rem]">
  <LottieAnimation :animationData="animationData"/>
</div>
</div>
    </div>
    <div class="bg-black bg-opacity-70 flex justify-center xs:col-span-2 md:col-span-1">
      <div class="w-2/3 my-auto">
        <h2 class="text-3xl font-bold text-center mb-20"><span class="text-yellow-500">Welcome</span> <span
            class="text-white">Back, Login.</span></h2>
        <form>
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

  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import LottieAnimation from '../components/LottieAnimation.vue';
import animationData from '../animations/anim.json'

const signinData = reactive({
  email: "",
  password: ""
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

        setisAuthenticated(true, response.data.role_name);
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
.typing-animation {
  margin-top: 4rem;
  display: inline-block;
  overflow: hidden;
  border-right: .15em solid white;
  white-space: nowrap;
  
  animation:
    typing 2s steps(30, end),
    blink-caret .75s step-end infinite;
}

@keyframes typing {
  from {
    width: 0
  }

  to {
    width: 70%
  }
}

@keyframes blink-caret {

  from,
  to {
    border-color: transparent
  }

  50% {
    border-color: white;
  }
}
</style>