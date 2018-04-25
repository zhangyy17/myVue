<template>
  <div :class="componentClasses">
    <input :class="$style.input" type="text" @focus="onFocus" @blur="onBlur" @keydown.enter="handleSearch(actualValue)" v-model="actualValue">
    <label :class="$style.label">{{placeholder}}</label>
    <span :class="[$style.resetIcon, 'icon-close']" @click="onReset"></span>
    <span :class="[$style.icon, 'icon-search']" @click="handleSearch(actualValue)"></span>
  </div>
</template>
<script>
export default {
  name: 'Searchor',
  props: {
    value: String,
    placeholder: String,
    handleSearch: Function
  },
  data() {
    return {
      label: null,
      isFocus: false
    };
  },
  computed: {
    hasInput() {
      return this.value && this.value.length;
    },
    componentClasses() {
      return [
        this.isFocus ? this.$style.componentFocus : this.$style.component,
        this.hasInput ? this.$style.componentInputed : this.$style.component
      ];
    },
    actualValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    }
  },
  methods: {
    onFocus() {
      this.isFocus = true;
    },
    onBlur() {
      this.isFocus = false;
    },
    onReset() {
      this.actualValue = '';

      this.handleSearch && this.handleSearch.call(this, '');
    }
  }
};
</script>
<style lang="postcss" module>
@import '../variables.css';

$inputHeight: $componentHeight;
$resetIconWidth: 16px;
$resetIconHeight: 16px;
$iconWidth: 15px;
$iconHeight: 16px;
$paddingSisze: 10px;
$paddingOfIcon: 5px;

.component {
  box-sizing: border-box;
  display: inline-block;
  line-height: 1em;
  position: relative;
  border: 1px solid $borderColor;
  border-radius: 4px;
  overflow: hidden;
  padding-right: $paddingSisze + $iconWidth;

  .label,
  .input,
  .reset-icon,
  .icon {
    float: left;
    position: relative;
  }

  .label {
    color: $borderColor;
    cursor: text;
    font-size: 12px;
    margin-left: -100%;
    margin-top: ($inputHeight - 16px)/2;
    padding-left: $paddingSisze;
  }

  .input {
    box-sizing: border-box;
    border: 0;
    height: $inputHeight;
    outline: 0;
    padding: 0 $paddingSisze;
    width: 100%;
  }

  .reset-icon {
    color: #7b8ea5;
    cursor: pointer;
    display: none;
    height: $resetIconHeight;
    margin-left: -($paddingSisze + $iconWidth);
    margin-top: ($inputHeight - $resetIconHeight)/2;
    width: $resetIconWidth;
  }

  .icon {
    color: #7b8ea5;
    cursor: pointer;
    display: block;
    height: $iconHeight;
    margin-left: -($paddingSisze + $iconWidth);
    margin-top: ($inputHeight - $iconHeight)/2;
    right: -($paddingSisze + $iconWidth);
    width: $iconWidth;
  }

  &--focus {
    composes: component;

    border-color: $themePrimaryColor;

    .label {
      display: none;
    }
  }

  &--inputed {
    composes: component;

    .label {
      display: none;
    }

    &:hover {
      padding-right: $paddingSisze + $paddingOfIcon + $resetIconWidth +
        $iconWidth;

      .reset-icon {
        display: block;
        margin-left: -($paddingSisze + $resetIconWidth + $iconWidth);
        right: -($paddingSisze + $resetIconWidth + $iconWidth);
      }

      .icon {
        right: -($paddingSisze + $paddingOfIcon + $resetIconWidth + $iconWidth);
      }
    }
  }
}
</style>
