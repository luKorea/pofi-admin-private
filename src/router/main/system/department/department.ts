/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:52
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-09 10:03:23
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/system/department/department.ts
 */
const department = () => import('@/views/main/system/department/department.vue')
export default {
  path: '/main/system/department',
  name: 'department',
  component: department,
  children: [],
  meta: {
    title: '部门管理'
  }
}
