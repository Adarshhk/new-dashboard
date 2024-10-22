<template>
    <div ref="lottieContainer"></div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import lottie from 'lottie-web';
  
  // Import the animation JSON file (resolve with bundler)
  import animationData from '../animations/anim.json';
  
  // Reference for the container
  const lottieContainer = ref(null);
  
  // Load animation on mount
  onMounted(() => {
    lottie.loadAnimation({
      container: lottieContainer.value, // The ref to the container
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData, // Use imported JSON data directly
    });
  });
  </script>
  
  <style scoped>
  div {
    width: 100%;
    height: 100%;
  }
  </style>
  