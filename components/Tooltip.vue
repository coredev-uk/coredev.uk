<template>
  <div class="text-sm absolute bg-black/70 left-full opacity-0 group-hover:opacity-100 transition px-2 py-1 rounded shadow text-white scale-75 group-hover:scale-100">
    {{ props.text }}
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    text: string
}>()
</script>

<style>

</style>

