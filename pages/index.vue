<script setup lang="ts">

const description = "Welcome to Core's personal website, where you can learn more about their interests, experiences, and achievements. Explore Core's journey and get in touch with them to connect and collaborate.";
const title = "Core's Website";
const url = "https://coredev.uk";

useHead({
  htmlAttrs: {
    lang: 'en',
  },


  title,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: description,
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: title,
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: description,
    },
    {
      hid: 'og:url',
      property: 'og:url',
      content: url,
    },
    {
      hid: 'twitter:card',
      property: 'twitter:card',
      content: 'summary',
    },
    {
      hid: 'twitter:title',
      property: 'twitter:title',
      content: title,
    },
    {
      hid: 'twitter:description',
      property: 'twitter:description',
      content: description,
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
  ],
});
</script>

<template>
    <div class="min-h-screen grid place-items-center bg-background font-sans">
        <Socials />
        <TitleContainer />
        <!-- <ProjectDropdown /> -->
    </div>
</template>
