<template>
  <div class="videos-page p-6">
    <h1 class="text-2xl font-bold text-[#31427A] mb-4">Videos</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="video in videos" :key="video.id" class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="aspect-w-16 aspect-h-9">
          <iframe 
            :src="'https://www.youtube.com/embed/' + video.youtubeId" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
          ></iframe>
        </div>
        <div class="p-4">
          <h2 class="text-lg font-semibold mb-2">{{ video.title }}</h2>
          <p class="text-gray-600">{{ video.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const videos = ref([
  {
    id: 1,
    youtubeId: 'dQw4w9WgXcQ', // Replace with the actual YouTube video ID
    title: 'IRON MAN 4: Resurrection – Teaser Trailer | Morgan Stark',
    description: 'Check out the concept teaser trailer for Iron Man 4 - Resurrection, arriving in 2025.'
  },
  // Add more videos here as needed
])
</script>

<style scoped>

</style>