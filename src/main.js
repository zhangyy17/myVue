import Vue from 'vue';
import router from './router';
import UUI from '.';
import './reset.css';

Vue.use(UUI);

new Vue({
  el: '#app',
  router // 把创建好的路由挂在到根组件就好了
});
