<template>
    <div class="flex gap-10">
        <NuxtImg src="/images/profile.gif" width="200" class="rounded-full border border-[#c04830] shadow shadow-accent hover:shadow-md hover:shadow-accent transition-shadow duration-200" />
        <div class="h-full m-auto w-full">
            <h1 class="mb-2"><glitched-writer text="Core" preset="encrypted" class="text-white text-5xl" appear /></h1>
            <span class="w-60 block"><glitched-writer :text="phrases" :queue="{ interval: 5000, loop: true }" preset="encrypted" class="text-white/50 text-2xl" appear /></span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import GlitchedWriter from "vue-glitched-writer";


const phrases = ref([
    'TypeScript Enjoyer',
    'Cider Developer',
    'Full stack developer',
])

</script>

<style></style>
