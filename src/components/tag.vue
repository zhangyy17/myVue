<template>
  <div :class="$style.component" v-if="visiable">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'Tag',
  props: {
    title: String
  },
  data() {
    return {
      visiable: false
    };
  },
  computed: {
    componentClasses() {
      return [this.$style.component];
    }
  }
};
</script>
<style lang="postcss" module>
.component {
}
</style>
