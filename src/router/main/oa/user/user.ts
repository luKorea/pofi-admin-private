/*
 * @Author: korealu
 * @Date: 2022-02-10 09:17:54
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 09:17:55
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/oa/user/user.ts
 */
const user = () => import('@/views/main/oa/user/user.vue')
export default {
  path: '/oa/user',
  name: 'user',
  component: user,
  children: [],
  meta: {
    title: '用户管理'
  }
}
