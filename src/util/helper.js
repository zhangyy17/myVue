/**
 * 将Boolean类型或者String类型的数据转换成Boolean类型的数据
 * @param {Boolean|String} value 待转换的值
 */
function parseBool (value) {
  if (typeof value === 'undefined') {
    return false;
  }
  if (typeof value === 'boolean') {
    return value;
  }

  return value !== 'fasle';
}

/**
 * 查询名为componentName的第1个父组件
 * @param {VueComponent} context 上下文
 * @param {String} componentName 父组件名称
 */
function findParent (context, componentName) {
  let parent = context.$parent;

  while (true) {
    if (!parent) {
      break;
    }
    if (parent.$options.name === componentName) {
      return parent;
    }
    parent = parent.$parent;
  }
}

/**
 * 查询所有名为componentName的所有子组件
 * @param {VueComponent} context 上下文
 * @param {String} componentName 子组件名称
 */
function findChildren (context, componentName) {
  return context.$children.reduce((children, child) => {
    if (child.$options.name === context.$options.name) {
      return children;
    }

    if (child.$options.name === componentName) {
      children.push(child);
    }

    const deepChildren = findChildren(child, componentName);
    return children.concat(deepChildren);
  }, []);
}

const TypeDetector = {
  STRING: 'String',
  OBJECT: 'Object',
  NUMBER: 'Number',
  BOOLEAN: 'Boolean',
  ARRAY: 'Array',
  FUNCTION: 'Function',
  UNDEFINED: 'Undefined',
  NULL: 'Null',
  is (value, type) {
    return Object.prototype.toString.call(value) === `[object ${type}]`;
  }
};

export { parseBool, findParent, findChildren, TypeDetector };
