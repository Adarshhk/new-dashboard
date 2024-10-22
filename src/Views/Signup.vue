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
            class="text-white">User, Register.</span></h2>
        <form @submit.prevent="verifyOtp" class="space-y-6">
          <div v-if="!otpAuthSignup">
            <!-- Full Name -->
            <div>
              <label for="name" class="block text-white text-sm font-bold mb-2">Full Name</label>
              <input id="name" type="text" name="name" v-model.trim="validateSignUp.name.$model"
                placeholder="Enter your name"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              <template v-if="validateSignUp.name.$error">
                <div v-for="error of validateSignUp.name.$errors" :key="error.$uid" class="text-red-500 text-sm mt-1">
                  {{ error.$message }}
                </div>
              </template>
            </div>

            <!-- Email -->
            <div class="mt-2">
              <label for="email" class="block text-white text-sm font-bold mb-2">Email</label>
              <input id="email" type="email" name="email" v-model.trim="validateSignUp.email.$model"
                placeholder="Enter your email"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              <template v-if="validateSignUp.email.$error">
                <div v-for="error of validateSignUp.email.$errors" :key="error.$uid" class="text-red-500 text-sm mt-1">
                  {{ error.$message }}
                </div>
              </template>
            </div>

            <!-- Mobile No. -->
            <div class="mt-2">
              <label for="mobile" class="block text-white text-sm font-bold mb-2">Mobile No.</label>
              <input id="mobile" type="tel" name="mobile" v-model.trim="validateSignUp.mobile.$model"
                placeholder="Enter your mobile number"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              <template v-if="validateSignUp.mobile.$error">
                <div v-for="error of validateSignUp.mobile.$errors" :key="error.$uid" class="text-red-500 text-sm mt-1">
                  {{ error.$message }}
                </div>
              </template>
            </div>

            <!-- Password -->
            <div class="mt-2">
              <label for="password" class="block text-white text-sm font-bold mb-2">Password</label>
              <div class="relative">
                <input :type="passwordFields.password ? 'text' : 'password'" id="password" name="password"
                  v-model.trim="validateSignUp.password.$model" placeholder="Enter your password"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <span @click="togglePasswordVisibility('password')"
                  class="absolute inset-y-0 right-4 flex items-center cursor-pointer">
                  <EyeOffIcon v-if="passwordFields.password" class="w-5 text-gray-600" />
                  <EyeIcon v-else class="w-5 text-gray-600" />
                </span>
              </div>
              <template v-if="validateSignUp.password.$error">
                <div v-for="error of validateSignUp.password.$errors" :key="error.$uid"
                  class="text-red-500 text-sm mt-1">
                  {{ error.$message }}
                </div>
              </template>
            </div>

            <!-- Confirm Password -->
            <div class="mt-2">
              <label for="confirm_password" class="block text-white text-sm font-bold mb-2">Confirm Password</label>
              <div class="relative">
                <input :type="passwordFields.confirm_password ? 'text' : 'password'" id="confirm_password"
                  name="confirm_password" v-model.trim="validateSignUp.confirm_password.$model"
                  placeholder="Confirm your password"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <span @click="togglePasswordVisibility('confirm_password')"
                  class="absolute inset-y-0 right-4 flex items-center cursor-pointer">
                  <EyeOffIcon v-if="passwordFields.confirm_password" class="w-5 text-gray-600" />
                  <EyeIcon v-else class="w-5 text-gray-600" />
                </span>
              </div>
              <template v-if="passwordsMatch === false">
                <p class="text-red-500 text-sm mt-1">Password does not match with confirm password</p>
              </template>
            </div>
          </div>

          <!-- OTP Section -->
          <div v-if="otpAuthSignup">
            <label for="otp" class="block text-white text-sm font-bold mb-2">Enter OTP</label>
            <input id="otp" type="text" name="otp" v-model.trim="validateOtp.otp.$model"
              placeholder="Enter your 6-digit OTP"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            <template v-if="validateOtp.otp.$errors">
              <div v-for="error of validateOtp.otp.$errors" :key="error.$uid" class="text-red-500 text-sm mt-1">
                {{ error.$message }}
              </div>
            </template>
          </div>

          <!-- Terms and Conditions -->
          <div class="flex justify-start">
            <div class="flex items-center">
              <input type="checkbox" id="T&C" v-model="checkbox" class="mr-2" />
              <label for="T&C" class="text-white text-sm font-bold">
                I agree to the&nbsp;
                <a :href="tncUrl" target="_blank" class="text-yellow-300 underline">T&C</a> and&nbsp;
                <a :href="privacyPolicyUrl" target="_blank" class="text-yellow-300 underline">Privacy Policy</a>
              </label>
            </div>
          </div>

          <!-- Submit Buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-between mt-6 space-y-4 sm:space-y-0">
            <button v-if="!otpAuthSignup" type="button" @click="signUp"
              :disabled="!checkbox || passwordsMatch === false"
              class="w-full sm:w-auto bg-yellow-300 hover:bg-yellow-500 text-[#1c5a5a] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
              Register
            </button>

            <button v-if="otpAuthSignup" type="submit" :disabled="!validateOtp.otp.$dirty || validateOtp.otp.$error"
              class="w-full sm:w-auto bg-yellow-300 hover:bg-yellow-500 text-[#1c5a5a] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
              Submit OTP
            </button>

            <!-- Already Registered -->
            <p class="text-sm text-white">
              Already have an account?&nbsp;
              <a href="/login"
                class="underline cursor-pointer hover:text-yellow-300 transition duration-300 ease-in-out">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>



<script setup>
import { ref, computed, reactive, toRefs, onMounted } from 'vue'
import { required, minLength, email, sameAs } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { makeRequest, state } from '../request/request'
import router from '../router/index'
import LottieAnimation from '../components/LottieAnimation.vue'
import animationData from '../animations/anim2.json'
// Reactive variables
const error = ref("")
const checkbox = ref(false)
const otpAuthSignup = ref(false)
const emailsignup = ref('')
const tncUrl = ref('')
const privacyPolicyUrl = ref('')

// Password visibility control
const passwordFields = reactive({
  password: false,
  confirm_password: false
})

// Function to toggle password visibility
function togglePasswordVisibility(field) {
  passwordFields[field] = !passwordFields[field];
}


const otpData = reactive({
  email: '',
  otp: ''
})

const otpRules = {
  email: { required },
  otp: { required, minLength: minLength(6) },
}

const validateOtp = useVuelidate(otpRules, toRefs(otpData))

// Vuelidate setup for Sign Up
const signUpData = reactive({
  name: '',
  email: '',
  mobile: '',
  password: '',
  confirm_password: '',
  isAgree: false,
  mobile_prefix: '+91'
})

const signUpRules = {
  name: { required },
  email: { required, email },
  mobile: { required },
  password: { required, minLength: minLength(6) },
  confirm_password: {
    required,
    sameAs: sameAs(() => signUpData.password)
  }
}

const validateSignUp = useVuelidate(signUpRules, toRefs(signUpData))

// Password mismatch computed property
const passwordsMatch = computed(() => {
  return signUpData.password === signUpData.confirm_password
})

// Sign Up function
const signUp = async () => {
  try {
    validateSignUp.value.$touch()
    if (!validateSignUp.value.$invalid) {
      signUpData.mobile = `${signUpData.mobile}`
      signUpData.isAgree = checkbox.value
      const response = await makeRequest('register', 'POST', signUpData)
      if (response) {
        otpAuthSignup.value = true
        otpData.email = signUpData.email
        idForOtpVerify.value = response.data
        error.value = ""
      } else {
        error.value = state["register"].error.data.message
      }
    }
  } catch (err) {
    error.value = state["register"].error.message || err.message
  }
}

// OTP Verification function
const idForOtpVerify = ref(0)

const verifyOtp = async () => {
  try {
    validateOtp.value.$touch()
    if (!validateOtp.value.$invalid) {
      const response = await makeRequest('verifyOTP', 'PUT', otpData, {}, {}, 0, idForOtpVerify.value)
      if (response) {
        error.value = ""
        router.push({ name: 'login' })
      } else {
        error.value = state["verifyOTP"].error.data.message
      }
    }
  } catch (err) {
    error.value = state["verifyOTP"].error.message || err.message
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