/*
 * @Author: korealu
 * @Date: 2022-02-10 10:32:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-17 09:59:26
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/user/user.ts
 */
const baseUser = () => import('@/views/main/user/user.vue')
export default {
  path: '/user/user',
  name: 'baseUser',
  component: baseUser,
  children: [],
  meta: {
    title: '用户管理'
  }
}
