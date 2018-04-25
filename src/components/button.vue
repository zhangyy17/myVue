<template>
  <!-- 绑定一个class，classes是计算属性里面的函数，返回一个数组，数组方式绑定class -->
  <!-- 绑定名为onClick的点击事件 -->
  <div :class="classes" @click="onClick" tabindex="0">
    <!-- label是本组件在props中显式声明的变量，接受来自父级的值 -->
    <!-- slot标签为该组件开启一个插槽，在父组件的模板里，插入到子组件标签内的所有内容将替代子组件的slot标签及其内容 -->
    <!-- 这里是单个slot -->
    <!-- 这个slot，在父组件传递了内容给该组件标签的时候，会被传入的内容完全替换 -->
    <slot>{{label}}</slot>
  </div>
</template>

<script>
import { parseBool } from '@/util/helper';

export default {
  name: 'Button',
  props: {
    label: String,
    type: String, // 显式的声明type变量，接受来自父级的值，该值用在computed中计算样式
    disabled: { // 对象写法，可以实现对传入值的验证
      // type还可以是自定义的构造器，使用instanceof进行检测
      type: [Boolean, String], // 传入的值必须是布尔值或者字符串，可用的值有一个值列表，还有Number，Array，Object，Function
      default: false // 如果未定义的时候使用的默认值
    },
    handleClick: Function // 显式的声明handleClick变量，接受来自父级的一个函数
  },
  data() {
    // props里面的值可以在data里面进行存储，然后直接使用data里面的值
    return {};
  },
  computed: {
    isDisabled() {
      // 处理父级通过props传进来的disabled的值
      return parseBool(this.disabled);
    },
    classes() {
      // props里面的值作为输入，该组件将来自父级的数据当做原始输入，经过处理后输出
      // 该组件对父级通过props传进来的type进行使用并返回新的值
      return [
        this.isDisabled ? this.$style.componentDisabled : this.$style.component,
        this.type === 'primary' && this.$style.componentPrimary // this.type是接收的来自父级的值，在这里用来计算样式
      ];
    }
  },
  methods: {
    onClick(event) { // 页面中元素的事件
      if (this.isDisabled) {
        return;
      }

      const handleClick = this.handleClick;
      handleClick && handleClick(event);
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

  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 65535px;
  color: #59718f;
  height: $componentHeight;
  line-height: $componentHeight;
  padding: 0 24px;
  text-align: center;

  &:active {
    border-color: $themePrimaryColor;
  }

  &--primary {
    background-color: $themePrimaryColor;
    border-color: $themePrimaryColor;
    color: #fff;

    &:active {
      background-color: $themePrimaryActiveColor;
      border-color: $themePrimaryActiveColor;
    }
  }

  &--disabled {
    composes: component;
    $disabledBackgroundColor: #fdfdfd;
    $disabledBorderColor: #eaecef;

    cursor: not-allowed;
    background-color: $disabledBackgroundColor;
    border-color: $disabledBorderColor;
    color: #ccc;

    &:active {
      background-color: $disabledBackgroundColor;
      border-color: $disabledBorderColor;
    }
  }
}
</style>
