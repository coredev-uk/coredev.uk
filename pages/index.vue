<script setup lang="ts">

const description = "Welcome to Core's personal website, where you can learn more about their interests, experiences, and achievements. Explore Core's journey and get in touch with them to connect and collaborate.";
const title = "Core's Website";
const url = "https://coredev.uk";

</script>

<template>
    <head>
        <title>{{ title }}</title>
        <meta property="description" :content="title" />

        <meta property="og:image" content="Link preview image URL">
        <meta property="og:title" :content="title">
        <meta property="og:description" :content="description" />
        <meta property="og:url" :content="url">

        <meta property="twitter:card" content="summary">
        <meta property="twitter:title" :content="title">
        <meta property="twitter:description" :content="description">

    </head>

    <div class="min-h-screen grid place-items-center bg-background font-sans">
        <Socials />
        <TitleContainer />
        <ProjectDropdown />
    </div>
</template>
