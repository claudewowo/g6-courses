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

for (let i = 0; i < files.keys().length; i++) {
  const key = files.keys()[i];
  const path = key.split('/')[1];

  routes.push({
    path:      `/${path}`,
    component: () => import(`../pages/${path}/index.vue`),
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
