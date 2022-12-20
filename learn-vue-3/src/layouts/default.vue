<script lang="ts" setup>
import Header from '@/components/Header.vue';
</script>
<template>
  <h1>default-layout</h1>
  <Header />
  <a-layout-content>
    <slot />
  </a-layout-content>
</template>
<style lang="scss" scoped></style>
