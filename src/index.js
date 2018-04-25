import '../static/style.css';

import {
  Button,
  Checkbox,
  CheckboxGroup,
  Modal,
  Searchor,
  Selector,
  Radio,
  RadioGroup,
  Table,
  Tag,
  Tags
} from '@/components';// @就是src目录，所以@/components就是src/components

const components = {
  uButton: Button,
  uCheckbox: Checkbox,
  uCheckboxGroup: CheckboxGroup,
  uModal: Modal,
  uSearchor: Searchor,
  uSelector: Selector,
  uRadio: Radio,
  uRadioGroup: RadioGroup,
  uTable: Table,
  uTag: Tag,
  uTags: Tags
};

function install(Vue, options) {
  const globalClickHandlers = [];

  document.addEventListener('click', event => {
    globalClickHandlers.forEach(handler => {
      handler(event);
    });
  });

  Vue.prototype.addGlobalClickHandler = (handler) => {
    globalClickHandlers.push(handler);
  };

  Vue.prototype.removeGlobalClickHandler = (handler) => {
    globalClickHandlers.splice(globalClickHandlers.indexOf(handler), 1);
  };

  Object.keys(components).forEach(key => {
    Vue.component(key, components[key]);
  });
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

let $ = {};

$.install = install;

export default $;
