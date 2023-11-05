<template>
  <div
    class="flex flex-col bg-zinc-950/20 p-5 rounded-lg shadow gap-5 w-full h-full text-white"
  >
    <NuxtImg :src="props.data.image" :alt="props.data.title" class="rounded order-2" />
    <div class="flex flex-col order-1">
      <div class="py-5">
        <h1 class="text-4xl font-bold">{{ props.data.title }}</h1>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  data: {
    title: string;
    description: string;
    image: string;
    link: string;
    stats: {
      stars: number;
      forks: number;
      issues: number;
    };
  };
}>();
</script>

<style></style>
