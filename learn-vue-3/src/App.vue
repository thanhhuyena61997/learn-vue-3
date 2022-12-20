<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const layout = computed(() => (route.meta.layout || 'blank') + '-layout');
</script>

<template>
  <a-config-provider>
    <component :is="layout">
      <router-view />
    </component>
  </a-config-provider>
</template>

<style scoped lang="scss"></style>
