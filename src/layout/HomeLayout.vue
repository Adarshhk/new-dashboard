<template>
    <div class="flex h-screen">
        <Sidebar />

        <div class="flex-1 bg-gray-100 xs:mt-12 sm:mt-0 xs:ml-0 lg:ml-60" >
            <RouterView />
        </div>
    </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import Sidebar from '../components/Sidebar.vue';



</script>