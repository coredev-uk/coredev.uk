<template>
  <Popover class="absolute top-5 right-5">

    <PopoverButton class="px-4 py-2 text-white rounded bg-black/40 focus:ring ring-gray-600 border-0"
      >Projects
      <font-awesome-icon class="ml-1 text-sm" icon="fa-solid fa-chevron-down"
    /></PopoverButton>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <PopoverPanel class="absolute z-10 right-0 mt-3">
        <div class="flex flex-col bg-black/40 py-7 px-2 pr-0 rounded gap-9 shadow">
          <DropdownItem
            title="Cider 2"
            subtext="Vue 3, Electron and Tauri"
            image="/images/cider2.png"
            link="///github.com/ciderapp/cider-2"
            />
            <DropdownItem
            title="Cider 1"
            subtext="OSS, Vue 2 and Electron"
            image="/images/cider1.png"
            link="///github.com/ciderapp/cider"
            />
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script lang="ts" setup>
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
</script>

<style></style>
