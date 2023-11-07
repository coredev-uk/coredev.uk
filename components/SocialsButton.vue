<template>
  <a :href="link" class="flex justify-center group">
    <font-awesome-icon
      v-if="!isImage"
      :icon="icon"
      class="text-2xl text-white transition duration-200"
      :class="color ? `group-hover:${color}` : 'group-hover:text-accent'"
    />
    <NuxtImg
      v-else
      :src="icon"
      :width="width"
      class="text-2xl text-white transition duration-200"
      :class="color ? `group-hover:${color}` : 'group-hover:text-accent'"
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
    isImage: false,
  }
);
</script>

<style></style>
