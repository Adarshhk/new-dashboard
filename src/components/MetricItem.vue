<template>
  <div class="bg-[#222222] shadow rounded-lg ">
    <div class="mt-6 ml-4 mb-10">
      <img :src="src" alt="" class="size-10 ">
    </div>
    <div class="flex ml-4 xs:mb-4">
      <div class="w-[5px] h-[50px] mr-2" :style="{backgroundColor : color}">

      </div>
      <div class="flex-col">
        <h3 class="text-sm font-medium text-gray-500">{{ title }}</h3>
      <p class="text-2xl font-semibold text-white">{{ value }}</p>
      </div>
      
    </div>
    
  </div>
</template>

<script setup>


const props = defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [Number, String],
    required: true
  },
  src : {
    type : String
  },
  color:{
    type : String
  }

})


// Compute the correct icon component

</script>