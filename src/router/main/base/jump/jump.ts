/*
 * @Author: korealu
 * @Date: 2022-02-10 10:18:57
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 11:17:45
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/base/jump/jump.ts
 */
const jump = () => import('@/views/main/base/jump/jump.vue')
export default {
  path: '/base/jump',
  name: 'jump',
  component: jump,
  children: [],
  meta: {
    title: '跳转设置'
  }
}
