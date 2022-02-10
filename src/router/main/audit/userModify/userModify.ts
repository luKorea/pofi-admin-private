/*
 * @Author: korealu
 * @Date: 2022-02-10 10:15:24
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 10:35:14
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/audit/userModify/userModify.ts
 */
const userModify = () => import('@/views/main/audit/userModify/userModify.vue')
export default {
  path: '/audit/userModify',
  name: 'userModify',
  component: userModify,
  children: []
}
