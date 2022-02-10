/*
 * @Author: korealu
 * @Date: 2022-02-10 10:28:44
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 11:13:11
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/goods/good/good.ts
 */
const good = () => import('@/views/main/goods/good/good.vue')
export default {
  path: '/goods/good',
  name: 'good',
  component: good,
  children: [],
  meta: {
    title: '资源商品'
  }
}
