<template>
  <div :class="$style.component" ref="component">
    <div :class="$style.value" @click="onToggle">
      {{selectedOption.label}}
      <span :class="[$style.stateIcon, 'icon-arrow--down']"></span>
    </div>
    <div :class="$style.options" v-if="expanding">
      <slot>
        <div :class="$style.option" v-for="(option, index) in standardOptions" :key="index" @click="onSelected(option)">{{option.label}}</div>
      </slot>
    </div>
  </div>
</template>
<script>
import { TypeDetector } from '@/util/helper';

export default {
  name: 'Selector',
  props: {
    value: [String, Number, Boolean],
    options: Array
  },
  data() {
    return {
      selectedOption: this.value,
      expanding: false
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
            value:
              typeof option.value !== 'undefined' ? option.value : option.label,
            label:
              typeof option.label !== 'undefined' ? option.label : option.value
          };
        } else {
          return { value: option, label: option };
        }
      });
    }
  },
  methods: {
    onToggle() {
      this.expanding = !this.expanding;
    },
    onCollapsing() {
      this.expanding = false;
    },
    onSelected(option) {
      // this.selectedOption = option;
      this.$emit('input', option.value);
      this.onCollapsing();
    },
    updateValue(value) {
      const currentOption = value;
      const standardOptions = this.standardOptions;
      if (standardOptions.length) {
        for (let idx = 0, len = standardOptions.length; idx < len; ++idx) {
          let option = standardOptions[idx];

          if (
            TypeDetector.is(currentOption, TypeDetector.OBJECT) &&
            currentOption.value === option.value
          ) {
            this.selectedOption = option;
            break;
          } else if (currentOption === option.value) {
            this.selectedOption = option;
            break;
          }
        }
      }
    },
    globalClickHandler(event) {
      if (!this.$refs.component.contains(event.target)) {
        this.expanding = false;
      }
    }
  },
  created() {
    this.updateValue(this.value);
  },
  mounted() {
    this.addGlobalClickHandler(this.globalClickHandler);
  },
  watch: {
    value(newValue) {
      this.updateValue(newValue);
    }
  }
};
</script>
<style lang="postcss" module>
@import "../variables.css";

$iconSize: 12px;
$diff: ($componentHeight - $iconSize) / 2;
$right: $iconSize + $diff;

$optionHoverColor: #e5e5e5;

.component {
  width: 100%;
  box-sizing: border-box;
  display: inline-block;
  line-height: 1em;
  position: relative;
  color: #3a3f53;
  min-width: 120px;
  outline: 0;
  vertical-align: middle;

  .value {
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid $borderColor;
    box-sizing: border-box;
    height: $componentHeight;
    line-height: $componentHeight;
    padding-left: $diff;

    .state-icon {
      content: "";
      color: $normalColor;
      display: block;
      font-size: 12px;
      height: $iconSize;
      position: absolute;
      top: $diff;
      text-align: center;
      right: $diff;
      width: $iconSize;
    }
  }

  .options {
    background: #fff;
    border: 1px solid $borderColor;
    border-top: 0;
    box-sizing: border-box;
    left: 0;
    position: absolute;
    width: 100%;
    z-index: 10000;

    .option {
      padding: $diff;
      cursor: pointer;

      &:hover {
        background-color: $optionHoverColor;
      }
    }
  }

  &:focus {
    .value {
      border-color: $themePrimaryColor;
    }
  }
}
</style>
