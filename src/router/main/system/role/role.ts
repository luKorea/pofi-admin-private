/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:48
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-09 10:02:54
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/system/role/role.ts
 */
const role = () => import('@/views/main/system/role/role.vue')
export default {
  path: '/main/system/role',
  name: 'role',
  component: role,
  children: [],
  meta: {
    title: '权限管理'
  }
}
