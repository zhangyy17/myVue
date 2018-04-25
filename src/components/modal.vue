<template>
  <!-- value值是来自父级的值，通过props显式声明的，但是在这里又是通过$emit将着个值反射到父级 -->
  <div :class="$style.component" v-if="value" ref="component">
    <div :class="$style.container" ref="container" :style="containerStyles">
      <div :class="$style.header">
        <!-- title值是来自父级的值，通过props在本组件显式声明 -->
        <slot name="header">{{title}}</slot>
        <div :class="[$style.closeIcon, 'icon-close']" @click="closeModal"></div>
      </div>
      <div :class="$style.content">
        <slot></slot>
        <!-- type是来自父级的值，通过props显式地在本组件声明 -->
        <div v-if="type ==='confirm'" :class="$style.buttonGroup">
          <!-- 使用u-button组件，在组件标签内使用了{{okBtn.label}}，渲染的时候会替换u-button组件的slot -->
          <!-- 在子组件上绑定事件v-bind:handleClick,绑定的事件为onOkBtn -->
          <!-- onOkBtn是在该组件内定义的 -->
          <!-- 使用u-button组件的时候，传递给u-button组件的值有：type和handleClick，还有一个要替换插槽的内容 -->
          <u-button type="primary" :handleClick="onOkBtn">{{okBtn.label}}</u-button>
          <!-- 使用u-button组件的时候，传递了handleClick和要替换插槽的内容 -->
          <!-- 传递给u-button的值，都能在u-button的props里找到，这样在u-button才能访问传递的值 -->
          <u-button :handleClick="onCancelBtn">{{cancelBtn.label}}</u-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Button } from '.';// 在本组件中使用到了u-button组件，所以需要import

// 组件输出
export default {
  name: 'Modal', // 组件的名字，也会是使用该组件的时候使用的组件标签名
  props: { // vue组件需要显式的说明自身需要传入哪些属性（或者说是【声明】从父组件接受的数据），并且可以赋有以默认值，也可以理解为父组件向子组件下发数据
    value: Boolean, // 这里是对象形式的props，还有一种形式的props就是字符串数组，props:["message-from-father"]
    title: String, // 可以通过v-bind【动态绑定】pros的值，:my-text="text",props:["my-text"]
    type: String,
    okBtn: { // 对象写法是应为验证的需要，该对象并未在父组件中传递，为何要在prosp中显式的声明？
      type: Object, // 必须是object
      default() { // 默认值
        return {
          label: 'OK'
        };
      }
    },
    cancelBtn: {
      type: Object,
      default() {
        return {
          label: 'Cancel'
        };
      }
    }
  },
  data() { // vue组件的data属性其实是一个函数，提供组件中用到的数据
    return {
      containerTop: 100
    };
  },
  computed: { // vue组件的computed属性
    containerStyles() {
      return {
        top: this.containerTop + 'px'
      };
    }
  },
  methods: { // vue组件内模板内的元素上使用的事件
    toggleModal() {
      // $emit函数使子组件向父组件通信，第一个参数为要抛出的方法名，第二个参数为抛出的方法的参数
      // $emit函数发射事件，只存在于子组件中
      // $on函数用来监听子组件触发的自定义事件，存在于组件
      // 发射的事件名为input，发射的数据为!this.value
      this.$emit('input', !this.value);// 广播事件为特殊的input事件
    },
    openModal() {
      // 发射的事件名为input，发射的数据为!this.true
      this.$emit('input', true);// 广播事件为特殊的input事件
    },
    closeModal() {
      // 发射的事件名为input，发射的数据为!this.false
      this.$emit('input', false);// 广播事件为特殊的input事件
    },
    onOkBtn() {
      const okBtn = this.okBtn;
      if (okBtn && okBtn.click && !okBtn.click()) {
        return;
      }
      this.closeModal();
    },
    onCancelBtn() {
      const cancelBtn = this.cancelBtn;
      if (cancelBtn && cancelBtn.click && !cancelBtn.click()) {
        return;
      }
      this.closeModal();
    }
  },
  beforeCreate() { // 涉及组件声明周期
    this.$options.components.uButton = Button;
  },
  updated() {
    const componentEl = this.$refs.component;
    const containerEl = this.$refs.container;
    if (componentEl && containerEl) {
      const screenHeight = componentEl.offsetHeight;
      const containerHeight = containerEl.offsetHeight;
      this.containerTop = (screenHeight - containerHeight) / 2;
    }
  }
};
</script>
<style lang="postcss" module>
@import '../variables.css';

.component {
  background: rgba(100,100,100,0.2);
  font-size: 12px;
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;

  .container {
    position: relative;
    width: 550px;
    margin: 0 auto;
    background-color: #fff;

    .header {
      background-color: $themePrimaryColor;
      color: #fff;
      font-weight: 700;
      height: 40px;
      line-height: 40px;
      padding: 0 20px 0 46px;
      position: relative;

      &::before {
        background-color: #fff;
        display: inline-block;
        content: '';
        height: 1em;
        margin-left: -26px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 6px;
      }

      .close-icon {
        // background: url('../../static/images/sprites/icon-cancel.png');
        cursor: pointer;
        display: inline-block;
        height: 16px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 15px;
        width: 16px;
      }
    }

    .content {
      padding: 20px;

      .button-group {
        border-top: 1px solid #cbd;
        margin-top: 20px;
        padding-top: 20px;
        text-align: center;
      }
    }
  }
}
</style>
