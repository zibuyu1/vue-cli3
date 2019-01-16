import Vue from 'vue';
import Router from 'vue-router';
import Home from 'views/layout.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/index',
          name: 'index',
          component: () => import('views/index.vue'),
        },
        {
          path: '/filters',
          name: 'filters',
          meta: {
            auth: true, // 是否需要登录校验
          },
          component: () => import('views/filters.vue'),
        },
        {
          path: '/mixins',
          name: 'mixins',
          meta: {
            auth: true, // 是否需要登录校验
          },
          component: () => import('views/mixins.vue'),
        },
        {
          path: '/computed',
          name: 'computed',
          meta: {
            auth: true, // 是否需要登录校验
          },
          component: () => import('views/computed.vue'),
        },
        {
          path: '/vuex',
          name: 'vuex',
          meta: {
            auth: true, // 是否需要登录校验
          },
          component: () => import('views/vuex.vue'),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((m) => m.meta.auth)) {
    // 需要进行登录验证
    next();
  } else {
    // 不需要进行登录验证
    next();
  }
});
export default router;
