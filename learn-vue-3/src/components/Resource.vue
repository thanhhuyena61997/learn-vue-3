<script lang="ts" setup></script>
<template>
  <h1>About component</h1>
  <div id="Resource" class="relative">
    <slot>
      <Suspense>
        <router-view v-if="true" />
      </Suspense>
    </slot>
  </div>
</template>
<style lang="scss" scoped></style>
