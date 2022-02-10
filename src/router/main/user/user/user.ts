/*
 * @Author: korealu
 * @Date: 2022-02-10 10:32:24
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 11:19:17
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/user/user/user.ts
 */
const baseUser = () => import('@/views/main/user/user/user.vue')
export default {
  path: '/user/user',
  name: 'baseUser',
  component: baseUser,
  children: [],
  meta: {
    title: '用户管理'
  }
}
