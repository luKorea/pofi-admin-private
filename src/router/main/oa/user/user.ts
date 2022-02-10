/*
 * @Author: korealu
 * @Date: 2022-02-10 09:17:54
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 11:19:50
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/oa/user/user.ts
 */
const userList = () => import('@/views/main/oa/user/user.vue')
export default {
  path: '/oa/user',
  name: 'userList',
  component: userList,
  children: [],
  meta: {
    title: '用户列表'
  }
}
