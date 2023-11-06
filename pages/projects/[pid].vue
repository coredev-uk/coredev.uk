<template>
  <div class="grid p-2 place-items-center bg-background min-h-screen ">
    <ProjectBox :data="project"/>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const project = {
    title: 'Project Title',
    description: 'Project Description',
    image: 'https://cider.sh/cider.png',
    link: 'https://github.com',
    stats: {
        stars: 100,
        forks: 100,
        issues: 100
    }
}

// When accessing /posts/1, route.params.id will be 1
console.log(route.params.pid)
</script>

<style>

</style>

