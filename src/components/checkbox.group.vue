<template>
  <div :class="$style.component">
    <slot>
      <u-checkbox v-for="(option, index) in standardOptions" :key="index" :disabled="option.disabled" :value="option.value" :label="option.label" :handleBefore="option.handleBefore" :handleCheck="option.handleCheck" :handleUncheck="option.handleUncheck" :handleEvent="option.handleEvent"></u-checkbox>
    </slot>
  </div>
</template>

<script>
import { findChildren, TypeDetector } from '@/util/helper';
import { Checkbox } from '.';

export default {
  name: 'CheckboxGroup',
  props: {
    value: Array,
    options: Array
  },
  data() {
    return {
      children: null
    };
  },
  computed: {
    standardOptions() {
      if (!this.options) {
        return [];
      }

      return this.options.map(option => {
        if (TypeDetector.is(option, TypeDetector.OBJECT)) {
          return {
            value: option.value || option.label,
            label: option.label || option.value,
            disabled: option.disabled,
            handleBefore: option.handleBefore,
            handleCheck: option.handleCheck,
            handleUncheck: option.handleUncheck,
            handleEvent: option.handleEvent
          };
        } else {
          return { value: option, label: option };
        }
      });
    }
  },
  beforeCreate() {
    this.$options.components.uCheckbox = Checkbox;
  },
  mounted() {
    this.children = findChildren(this, Checkbox.name);
    this.children.forEach(child => {
      const childValue = child.value || child.label;
      if (-1 !== this.value.indexOf(childValue)) {
        child.checkedState = true;
      }

      child
        .$on('check', value => {
          if (-1 === this.value.indexOf(value)) {
            this.value.push(value);
          }
        })
        .$on('uncheck', value => {
          let index = this.value.indexOf(value);
          if (-1 !== index) {
            this.value.splice(index, 1);
          }
        });
    });
  },
  watch: {
    value(newValue) {
      this.children.forEach(child => {
        const childValue = child.value || child.label;
        if (-1 !== newValue.indexOf(childValue)) {
          child.checkedState = true;
        } else {
          child.checkedState = false;
        }
      });
    }
  }
};
</script>

<style lang="postcss" module>
@import '../variables.css';

.component {
  box-sizing: border-box;
  display: inline-block;
  line-height: 1em;
  position: relative;
  cursor: pointer;
}
</style>
