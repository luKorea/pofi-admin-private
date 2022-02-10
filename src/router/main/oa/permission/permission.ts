/*
 * @Author: korealu
 * @Date: 2022-02-10 09:17:54
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 11:20:31
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/oa/permission/permission.ts
 */
const permission = () => import('@/views/main/oa/permission/permission.vue')
export default {
  path: '/oa/permission',
  name: 'permission',
  component: permission,
  children: [],
  meta: {
    title: '权限列表'
  }
}
