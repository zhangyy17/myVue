<template>
  <div :class="componentClasses" @click="onClick">
    <span :class="stateClasses"></span>
    <slot>{{label || value}}</slot>
  </div>
</template>

<script>
import { parseBool, findParent } from '@/util/helper';
import { CheckboxGroup } from '.';

export default {
  name: 'Checkbox',
  props: {
    value: [Boolean, String, Number],
    checked: {
      type: [Boolean, String, Number],
      default: true
    },
    unchecked: {
      type: [Boolean, String, Number],
      default: false
    },
    disabled: [Boolean, String],
    label: [Boolean, String, Number],
    handleBefore: Function,
    handleCheck: Function,
    handleUncheck: Function,
    handleEvent: Function
  },
  data() {
    return {
      checkedState: this.value === this.checked,
      parent: null,
      group: false
    };
  },
  computed: {
    isDisabled() {
      return parseBool(this.disabled);
    },
    stateClasses() {
      // return [this.$style.state, this.checkedState && this.$style.stateChecked];
      return [
        this.checkedState
          ? [this.$style.stateChecked, 'icon-checkbox--checked']
          : [this.$style.state, 'icon-checkbox--unchecked']
      ];
    },
    componentClasses() {
      return [
        this.$style.component,
        this.isDisabled && this.$style.componentDisabled
      ];
    }
  },
  methods: {
    onClick() {
      if (this.isDisabled) {
        return;
      }

      const handleBefore = this.handleBefore;
      const handleCheck = this.handleCheck;
      const handleUncheck = this.handleUncheck;
      const handleEvent = this.handleEvent;

      let value = this.value || this.label;
      if (handleBefore && !handleBefore(this, value)) {
        return;
      }

      this.checkedState = !this.checkedState;

      if (this.group) {
        if (this.checkedState) {
          this.$emit('check', value);
          handleCheck && handleCheck.call(this, value);
        } else {
          this.$emit('uncheck', value);
          handleUncheck && handleUncheck.call(this, value);
        }
      } else {
        if (this.checkedState) {
          value = this.checked;
          handleCheck && handleCheck.call(this, value);
        } else {
          value = this.unchecked;
          handleUncheck && handleUncheck.call(this, value);
        }
        this.$emit('input', value);
      }

      this.$nextTick(() => {
        handleEvent && handleEvent.call(this, value);
      });
    }
  },
  mounted() {
    this.parent = findParent(this, CheckboxGroup.name);
    if (this.parent) {
      this.group = true;
    }
  },
  watch: {
    value(newValue) {
      this.checkedState = newValue === this.checked;
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

  .state {
    color: #b3b3b3;

    &--checked {
      color: #7b8ea5;
    }
  }

  &--disabled {
    .state,
    .state--checked {
      color: #d9d9d9;
    }
  }
}
</style>
