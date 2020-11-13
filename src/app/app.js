/*
 * @author claude
 * date 2019/11/09
 * 应用程序入口文件
 */
import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import '@styles/base.scss';

const routes = [{
    path:      '/',
    component: () => import('../pages/day-01/index.vue'),
  },
];

const files = require.context('../pages/', true, /\/index.vue$/);

for (let i = 0; i <= files.keys().length; i++) {
  if (i < 10) i = `0${i}`;
  routes.push({
    path:      `/day-${i}`,
    component: () => import(`../pages/day-${i}/index.vue`),
  });
}

const router = new VueRouter({
  mode: 'history',
  routes,
});

Vue.use(VueRouter);

/**
 * 应用入口
 */
window.$app = new Vue({
  el:     '#app',
  render: h => h(App),
  router,
});
