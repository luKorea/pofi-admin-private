/*
 * @Author: korealu
 * @Date: 2022-02-09 09:56:39
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-09 18:13:31
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/index.ts
 */
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import localCache from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue'),
    children: [
      {
        path: '/oa/user',
        name: 'user',
        component: () => import('@/views/oa/user/user.vue')
        // children: [] -> 根据userMenus来决定 -> children
      },
      {
        path: '/oa/role',
        name: 'role',
        component: () => import('@/views/oa/role/role.vue')
        // children: [] -> 根据userMenus来决定 -> children
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

// 导航守卫
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }

  // console.log(router.getRoutes())
  // console.log(to) // route对象

  // if (to.path === '/main') {
  //   console.log(firstMenu, 'frs')
  //   return firstMenu.path
  // }
})

export default router
