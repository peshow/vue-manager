import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/readme'
    },
    {
      path: '/login',
      component: resolve => require(['../components/Login.vue'], resolve)
    },
    {
      path: '/readme',
      name: 'Hello',
      component: resolve => require(['../components/common/Main.vue'], resolve),
      children: [
        {
          path: '/',
          component: resolve => require(['../components/page/Readme.vue'], resolve)
        },
        {
          path: '/control',
          component: resolve => require(['../components/page/Control.vue'], resolve)
        },
        {
          path: '/codechange',
          component: resolve => require(['../components/page/Codechange.vue'], resolve)
        },
        {
          path: '/upload',
          component: resolve => require(['../components/page/Upload.vue'], resolve)
        },
        {
          path: '/addremote',
          component: resolve => require(['../components/page/AddRemote.vue'], resolve)
        }
      ]
    }
  ]
})
