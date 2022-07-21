/*
 * @Author: korealu
 * @Date: 2022-02-09 09:56:39
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-21 16:29:40
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
    path: '/pofiLink',
    name: 'pofiLink',
    component: () => import('@/views/link/index.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue'),
    meta: {
      title: '首页'
    }
    // children: [
    //   {
    //     path: '/finance/warehouse',
    //     name: 'warehouse',
    //     component: () => import('@/views/main/finance/warehouse/warehouse.vue'),
    //     meta: {
    //       title: '用户资源仓库'
    //     }
    //     // children: [] -> 根据userMenus来决定 -> children
    //   }
    // ]
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
    // 当前系统是否登录，目前不适用
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
  // 重定向页面
  if (to.path === '/main') {
    console.log(firstMenu, 'frs')
    return firstMenu.url
  }
})

export default router
