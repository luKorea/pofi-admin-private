/*
 * @Author: korealu
 * @Date: 2022-02-10 10:30:20
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 11:22:32
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/help/companion/companion.ts
 */
const companion = () => import('@/views/main/help/companion/companion.vue')
export default {
  path: '/help/companion',
  name: 'companion',
  component: companion,
  children: [],
  meta: {
    title: '使用指南'
  }
}
