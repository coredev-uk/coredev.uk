<template>
  <a :href="link" class="flex justify-center group">
    <font-awesome-icon
      v-if="!isImage"
      :icon="icon"
      :class="color"
      class="text-2xl group-hover:text-accent transition duration-200"
    />
    <NuxtImg
      v-else
      :src="icon"
      :class="color"
      :width="width"
      class="w-8 h-8 group-hover:opacity-70 transition duration-200"
    />
    <Tooltip :text="tooltip" />
  </a>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    icon: string;
    tooltip: string;
    link: string;
    color?: string;
    isImage?: boolean;
    width?: number;
  }>(),
  {
    color: "text-white",
    isImage: false,
  }
);
</script>

<style></style>
