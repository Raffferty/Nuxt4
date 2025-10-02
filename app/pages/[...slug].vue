<script lang="ts" setup>
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})
</script>

<template>
  <ContentRenderer v-if="page" :value="page" class="content-main" />
</template>

<style lang="scss">
.content-main {
  min-height: 100%;
  flex: 1 1 auto;
}
</style>
