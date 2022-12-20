<template>
  <component :is="dynamicIcon" v-bind="$attrs" />
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent } from 'vue';
export default defineComponent({
  name: 'SBaseIcon',

  props: {
    name: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const dynamicIcon = computed(() =>
      defineAsyncComponent(() => import(`../../assets/icons/ico_${props.name}.svg`))
    );

    console.log(dynamicIcon);

    return {
      dynamicIcon
    };
  }
});
</script>
<style lang="scss" scoped>
@import './BaseIcon.scss';
</style>
