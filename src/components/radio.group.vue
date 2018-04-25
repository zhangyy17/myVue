<template>
  <div :class="$style.component">
    <slot>
      <radio v-for="(option, index) in standardOptions" :key="index" :disabled="option.disabled" :value="option.value" :label="option.label" :handleBefore="option.handleBefore" :handleCheck="option.handleCheck" :handleUncheck="option.handleUncheck" :handleEvent="option.handleEvent"></radio>
    </slot>
  </div>
</template>

<script>
import { findChildren, TypeDetector } from '@/util/helper';
import { Radio } from '.';

export default {
  name: 'RadioGroup',
  props: {
    value: [Boolean, String, Number],
    options: {
      type: [Array]
    }
  },
  data() {
    return {
      children: []
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
    this.$options.components.Radio = Radio;
  },
  mounted() {
    this.children = findChildren(this, Radio.name);
    this.children.forEach(child => {
      const childValue = child.value || child.label;
      child.checkedState = this.value === childValue;

      child.$on('input', value => {
        this.$emit('input', value);
      });
    });
  },
  watch: {
    value(newValue) {
      this.children.forEach(child => {
        const childValue = child.value || child.label;
        child.checkedState = newValue === childValue;
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
}
</style>
