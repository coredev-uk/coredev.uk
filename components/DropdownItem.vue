<template>
  <div class="group relative pr-16 pl-5">
    <a href="/">
      <span
        class="bg-zinc-800 absolute -inset-1 -inset-y-5 rounded transition scale-95 opacity-0 group-hover:opacity-50 group-hover:shadow"
      />
      <div class="grid grid-cols-[44px,1fr] gap-3 relative z-10">
        <NuxtImg v-if="image" :src="image" height="44px" class="p-1" />
        <font-awesome-icon
          v-else-if="icon"
          :icon="icon"
          class="text-white text-2xl p-1"
        />
        <div class="flex flex-col">
          <span class="text-white text-sm whitespace-nowrap font-bold">
            {{ props.title }}
          </span>
          <span class="text-white/50 text-sm whitespace-nowrap">{{
            props.subtext
          }}</span>
        </div>
      </div>
    </a>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    title: string;
    subtext: string;
    image?: string;
    icon?: string;
  }>(),
  {
    title: "Title",
    subtext: "Subtext",
  }
);
</script>

<style></style>
