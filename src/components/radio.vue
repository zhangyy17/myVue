<template>
  <div :class="componentClasses" @click="onClick">
    <span :class="stateClasses"></span>
    <slot>{{label || value}}</slot>
  </div>
</template>

<script>
import { parseBool, findParent } from '@/util/helper';
import { RadioGroup } from '.';

export default {
  name: 'Radio',
  props: {
    label: String,
    value: [Boolean, String, Number],
    disabled: [Boolean, String],
    checked: {
      type: [Boolean, String, Number],
      default: true
    },
    unchecked: {
      type: [Boolean, String, Number],
      default: false
    },
    handleBefore: Function,
    handleCheck: Function,
    handleUncheck: Function,
    handleEvent: Function
  },
  computed: {
    isDisabled() {
      return parseBool(this.disabled);
    },
    componentClasses() {
      return [
        this.isDisabled ? this.$style.componentDisabled : this.$style.component
      ];
    },
    stateClasses() {
      return [
        this.checkedState
          ? [this.$style.stateChecked, 'icon-radio--checked']
          : [this.$style.stateUnchecked, 'icon-radio--unchecked']
      ];
    }
  },
  data() {
    return {
      checkedState: this.value === this.checked,
      parent: null,
      group: false
    };
  },
  methods: {
    onClick() {
      // 如果组件Disabled，则不允许触发选中时间
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

      if (this.group) {
        this.checkedState = true;
        this.$emit('input', value);
        handleCheck && handleCheck.call(this, value);
      } else {
        this.checkedState = !this.checkedState;
        if (this.checkedState) {
          value = this.checked;
          this.$emit('input', value);
          handleCheck && handleCheck.call(this, value);
        } else {
          value = this.unchecked;
          this.$emit('input', value);
          handleUncheck && handleUncheck.call(this, value);
        }
      }

      this.$nextTick(() => {
        handleEvent && handleEvent.call(this, value);
      });
    }
  },
  watch: {
    value(newValue) {
      this.checkedState = newValue === this.checked;
    }
  },
  mounted() {
    this.parent = findParent(this, RadioGroup.name);
    if (this.parent) {
      this.group = true;
    }
  }
};
</script>

<style lang="postcss" module>
@import "../variables.css";

.component {
  box-sizing: border-box;
  display: inline-block;
  line-height: 1em;
  position: relative;
  cursor: pointer;

  > span {
    vertical-align: middle;
  }

  .state--unchecked {
    font-size: 16px;
    color: #b3b3b3;
  }

  .state--checked {
    font-size: 16px;
    color: #7b8ea5;
  }

  &--disabled {
    composes: component;

    .state--unchecked,
    .state--checked {
      font-size: 16px;
      color: #d9d9d9;
    }
  }
}
</style>
