import Vue from 'vue';
import Router from 'vue-router';
import Home from '../pages/home';

Vue.use(Router);

export default new Router({ // 创建router，并映射路由
  routes: [
    {
      path: '/', // 映射路径
      name: 'Home', // 命名路由，给路由起一个名字，根据名字就能找到
      component: Home // 映射组件，将路由指向Home.vue组件
    }
  ]
});
