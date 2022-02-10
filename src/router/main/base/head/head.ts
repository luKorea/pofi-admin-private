/*
 * @Author: korealu
 * @Date: 2022-02-10 10:18:46
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 11:17:28
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/base/head/head.ts
 */
const head = () => import('@/views/main/base/head/head.vue')
export default {
  path: '/base/head',
  name: 'head',
  component: head,
  children: [],
  meta: {
    title: '默认头像'
  }
}
