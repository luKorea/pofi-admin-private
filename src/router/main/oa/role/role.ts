/*
 * @Author: korealu
 * @Date: 2022-02-10 09:17:54
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 11:20:38
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/oa/role/role.ts
 */
const role = () => import('@/views/main/oa/role/role.vue')
export default {
  path: '/oa/role',
  name: 'role',
  component: role,
  children: [],
  meta: {
    title: '角色列表'
  }
}
