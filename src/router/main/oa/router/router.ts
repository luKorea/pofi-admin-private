/*
 * @Author: korealu
 * @Date: 2022-02-10 09:17:54
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 11:20:42
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/oa/router/router.ts
 */
const router = () => import('@/views/main/oa/router/router.vue')
export default {
  path: '/oa/router',
  name: 'router',
  component: router,
  children: [],
  meta: {
    title: '路由列表'
  }
}
