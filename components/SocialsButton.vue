<template>
  <a :href="link" class="flex justify-center group">
    <font-awesome-icon :icon="icon" :class="color" class="text-2xl group-hover:text-white/70 transition duration-200"/>

    <Tooltip :text="tooltip"  />
  </a>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  icon: string;
  tooltip: string;
  link: string;
  color?: string;
}>(), {
  color: "text-white",
});
</script>

<style></style>
