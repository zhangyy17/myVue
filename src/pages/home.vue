<template>
  <div :class="$style.page">

    <div>
      <h3>Tags</h3>
      <p>
        <u-tags>
          <u-tag title="Table">
            <u-table :headers="['Header1','Header2','Header3','Header4','Header5']"></u-table>
          </u-tag>
          <u-tag title="Selector">
            <u-selector v-model="selector" :options="selectorItems"></u-selector>
            {{selector}}
          </u-tag>
          <u-tag title="Modal">
            <!-- 父组件定义class -->
            <u-button v-bind:handleClick="toggleModal">Toggle Modal</u-button>
            <!-- 调用组件时需要传入所需的属性和方法 -->
            <!-- v-model不是用在input上的时候怎么理解 -->
            <!-- title将通过子组件的props的title值传递给子组件 -->
            <!-- type是传给子组件的值，子组件的props里面有该值的显式声明 -->
            <!-- v-modal组件标签上的v-model绑定一个名为showModal的值，接收子组件$emit发射的input事件传递的值 -->
            <!-- vue2.0的功能，在子组件标签上使用v-model -->
            <u-modal v-model="showModal" title="标题" type="confirm">
              <u-table :headers="['Header1','Header2','Header3','Header4','Header5']"></u-table>
            </u-modal>
          </u-tag>
          <u-tag title="Searchor">
            <u-searchor placeholder="This is a placeholder" v-model="message" :handleSearch="handleSearch" style="width: 500px;"></u-searchor>
            {{message}}
          </u-tag>
          <u-tag title="Checkbox">
            <p>
              <u-checkbox v-model="checkbox">{{checkbox}}</u-checkbox>
              <u-checkbox v-model="checkbox" disabled>{{checkbox}}</u-checkbox>
            </p>
            <p>
              <u-checkbox-group v-model="checkboxes">
                <u-checkbox label="杭州"></u-checkbox>
                <u-checkbox label="深圳" disabled></u-checkbox>
                <u-checkbox label="南京"></u-checkbox>
              </u-checkbox-group>
              {{checkboxes}}
            </p>
            <p>
              <u-checkbox-group v-model="checkboxes" :options="checkboxes2"></u-checkbox-group>
            </p>
          </u-tag>
          <u-tag title="Radio">
            <u-radio>Yes</u-radio>
            <u-radio label="No"></u-radio>
            <u-radio v-model="checked">{{checked}}</u-radio>
            <u-radio disabled>Disabled Unchecked</u-radio>
            <u-radio disabled :value="true">Disabled checked</u-radio>
            <p>
              <u-radio v-model="isOpen" :checked="1" :unchecked="0">开启</u-radio>
              <u-radio v-model="isOpen" :checked="0" :unchecked="1">关闭</u-radio>
              {{isOpen}}
            </p>
            <p>
              <u-radio-group v-model="region">
                <u-radio value="0">深圳</u-radio>
                <u-radio value="1">南京</u-radio>
                <u-radio value="2">杭州</u-radio>
              </u-radio-group>
              {{region}}
            </p>
            <p>
              <u-radio-group v-model="region">
                <u-radio label="0">深圳</u-radio>
                <u-radio label="1" disabled>南京</u-radio>
                <u-radio label="2">杭州</u-radio>
              </u-radio-group>
              {{region}}
            </p>
            <p>
              <u-radio-group v-model="region2">
                <u-radio label="深圳" :handleEvent="handleEvent"></u-radio>
                <u-radio label="南京"></u-radio>
                <u-radio label="杭州"></u-radio>
              </u-radio-group>
              {{region2}}
            </p>
            <p>
              <u-radio-group v-model="region3" :options="options"></u-radio-group>
              {{region3}}
            </p>
          </u-tag>
          <u-tag title="Button">
            <!-- u-button是一个组件标签 -->
            <!-- u-button组件里面有一个slot插槽 -->
            <!-- 在渲染该组件的时候，Button会替换u-button组件里面的slot标签 -->
            <u-button type="primary">Button</u-button>
            <!-- label是将要传给子组件的一个值，'Button2'将传递给子组件的props的label变量 -->
            <!-- handleClick是将要传给子组件的值，该值是一个function，定义的handleClick函数将传给子组件的props的handleClick变量 -->
            <!-- 没有在子组件标签内嵌入内容，不会替换子组件的插槽，BUtton2是怎么渲染到子组件的？ -->
            <u-button label="Button2" :handleClick="handleClick"></u-button>
            <!-- type是将要传给子组件的一个值，“primary” 将传递给子组件的props的type变量-->
            <!-- disabled是将要传给子组件的一个值，直接就将自己传过去了？ -->
            <u-button type="primary" disabled :handleClick="handleClick">Disabled</u-button>
          </u-tag>
        </u-tags>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      message: 'Home page',
      checked: true,
      isOpen: 1,
      region: '0',
      region2: '杭州',
      region3: '开启',
      options: ['开启', '关闭'],
      checkbox: false,
      checkboxes: ['杭州'],
      checkboxes2: ['杭州', '深圳', '南京'],
      showModal: false, // 本页面使用到的数据，通过v-model绑定在v-modal组件标签上，可以接受v-modal组件$emit-input的值
      selector: 'value3',
      selectorItems: [
        { label: 'label1', value: 'value1' },
        { label: 'label2', value: 'value2' },
        { label: 'label3', value: 'value3' },
        { label: 'label4', value: 'value4' }
      ]
    };
  },
  methods: {
    handleClick(event) {
      alert('Button was clicked.');
    },
    handleEvent(value) {
      alert(`Value: ${value}`);
    },
    handleSearch(value) {
      console.log(value);
    },
    toggleModal() { // 自定义页面事件
      this.showModal = !this.showModal;
    }
  }
};
</script>

<style lang="postcss" module>
.page {
}
</style>
