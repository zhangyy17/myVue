<template>
  <div :class="$style.component">
    <div :class="$style.header" ref="header">
      <table>
        <colgroup>
          <col width="210">
          <col width="210">
          <col width="210">
          <col width="210">
          <col width="227">
        </colgroup>
        <thead>
          <tr>
            <th v-for="(header, index) in headers" :key="index">{{header}}</th>
          </tr>
        </thead>
      </table>
    </div>
    <div :class="$style.content" ref="content">
      <table ref="contentTable">
        <colgroup>
          <col width="210">
          <col width="210">
          <col width="210">
          <col width="210">
          <col width="210">
        </colgroup>
        <tbody>
          <tr>
            <td>value1</td>
            <td>value2</td>
            <td>value3</td>
            <td>value4</td>
            <td>value5</td>
          </tr>
          <tr>
            <td>value1</td>
            <td>value2</td>
            <td>value3</td>
            <td>value4</td>
            <td>value5</td>
          </tr>
          <tr>
            <td>value1</td>
            <td>value2</td>
            <td>value3</td>
            <td>value4</td>
            <td>value5</td>
          </tr>
          <tr>
            <td>value1</td>
            <td>value2</td>
            <td>value3</td>
            <td>value4</td>
            <td>value5</td>
          </tr>
          <tr>
            <td>value1</td>
            <td>value2</td>
            <td>value3</td>
            <td>value4</td>
            <td>value5</td>
          </tr>
          <tr>
            <td>value1</td>
            <td>value2</td>
            <td>value3</td>
            <td>value4</td>
            <td>value5</td>
          </tr>
          <tr>
            <td>value1</td>
            <td>value2</td>
            <td>value3</td>
            <td>value4</td>
            <td>value5</td>
          </tr>
          <tr>
            <td>value1</td>
            <td>value2</td>
            <td>value3</td>
            <td>value4</td>
            <td>value5</td>
          </tr>
          <tr>
            <td>value1</td>
            <td>value2</td>
            <td>value3</td>
            <td>value4</td>
            <td>value5</td>
          </tr>
          <tr>
            <td>value1</td>
            <td>value2</td>
            <td>value3</td>
            <td>value4</td>
            <td>value5</td>
          </tr>
        </tbody>
      </table>
    </div>
    <slot></slot>
  </div>
</template>
<script>
import { TypeDetector } from '../util/helper';

export default {
  name: 'Table',
  props: {
    headers: {
      type: Array,
      required: true
    }
  },
  computed: {
    standardHeaders() {
      return this.headers.map(header => {
        if (TypeDetector.is(header, TypeDetector.OBJECT)) {
          return header;
        } else if (TypeDetector.is(header, TypeDetector.STRING)) {
          return {
            label: header,
            width: this.$refs.contentTable.clientWidth / this.headers.length
          };
        }
      });

      function calcColumnWidth() {
        const contentEl = this.$refs.content;
        const contentTableEl = this.$refs.contentTable;
        let contentHeight = contentEl.clientHeight;
        let contentTableHeight = contentTableEl.offsetHeight;
        let isScroll = contentTableHeight > contentHeight;
        if (isScroll) {
        }
        let columnWidth = contentTableEl.clientWidth;
      }
    }
  },
  mounted() {
    const contentEl = this.$refs.content;
    const contentTableEl = this.$refs.contentTable;
    let contentHeight = contentEl.clientHeight;
    let contentTableHeight = contentTableEl.offsetHeight;
    let isScroll = contentTableHeight > contentHeight;
    if (isScroll) {
    }
  }
};
</script>
<style lang="postcss" module>
@import '../variables.css';

.component {
  table {
    border-collapse: collapse;
    table-layout: fixed;
    text-align: left;
    width: 100%;

    tr {
      border-bottom: 1px solid $borderColor;
    }

    th {
      height: 36px;
      line-height: 36px;
    }
    td {
      height: 50px;
      line-height: 50px;
    }
  }

  .header {
    table {
      border-top: 1px solid $borderColor;
    }
  }

  .content {
    overflow: auto;
    max-height: 200px;
    border-bottom: 1px solid $borderColor;

    tr:nth-child(2n) {
      background-color: #f9f9f9;
    }

    tr:hover {
      background-color: #f4f4f4;
    }

    tr:last-child {
      border-bottom: 0;
    }
  }
}
</style>
