<template>
  <div :class="$style.component">
    <div :class="$style.nav">
      <div :class="[$style.navItem, child === activeChild ? $style.navItemActive : '']" v-for="(child, index) in children" :key="index" @click="onSelected(child)">{{child.title}}</div>
    </div>
    <div :class="$style.content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { findChildren } from '@/util/helper';
import { Tag } from '.';
export default {
  name: 'Tags',
  data() {
    return {
      children: [],
      activeChild: null
    };
  },
  methods: {
    onSelected(child) {
      child.visiable = true;
      this.children.forEach(currentChild => {
        if (child === currentChild) {
          return;
        }
        currentChild.visiable = false;
      });
      this.activeChild = child;
    }
  },
  mounted() {
    const children = (this.children = findChildren(this, Tag.name));
    if (this.children.length) {
      this.onSelected(children[0]);
    }
  }
};
</script>
<style lang="postcss" module>
@import '../variables.css';

.component {
  .nav {
    border-bottom: 1px solid $borderColor;
    box-sizing: border-box;
    height: 40px;
    line-height: 40px;

    &-item {
      cursor: pointer;
      box-sizing: border-box;
      display: inline-block;
      font-size: 14px;
      font-weight: bold;
      height: 40px;
      line-height: 40px;
      padding: 0 24px;

      &--active {
        color: $themePrimaryColor;
        border-bottom: 1px solid #fff;
        border-left: 1px solid $borderColor;
        border-right: 1px solid $borderColor;
        border-top: 2px solid $themePrimaryColor;
      }
    }
  }

  .content {
    padding: 16px 0;
  }
}
</style>
